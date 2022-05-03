import {Express, Request, Response} from 'express';
import {EResponseCode, ExtendedError} from '../types/express-additionals';

export enum METHOD {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    DELETE = 'delete',
    PATCH = 'patch',
}

interface RouteConfigProps {
    server: Express;
    method: METHOD;
    path: string;
}

const makeErrorJson = (e: Error, errorMessage: string) => ({
    success: false,
    error: true,
    errorName: e.name,
    errorStack: e.stack,
    errorMessage,

})

export function routeConfig({server, method, path}: RouteConfigProps): MethodDecorator {
    return function (
        target: Object,
        propertyKey: string | symbol,
        descriptor: PropertyDescriptor
    ) {
        const response = async (req: Request, res: Response) => {
            try {
                const data = await descriptor.value(req, res);
                res.status(200).json({success: true, data});
            } catch (e) {
                if (e instanceof ExtendedError) {

                    return res.status(e.code).json(
                        makeErrorJson(e, e.message)
                    );

                } else if (e instanceof Error) {
                    switch (e.name) {
                        case 'JsonWebTokenError':
                            return res.status(EResponseCode.UNAUTHORIZED).json(
                                makeErrorJson(e, 'Unauthorized')
                            )
                        default:
                            return res.status(EResponseCode.INTERNAL_ERROR).json(makeErrorJson(e, e.message));
                    }

                } else {
                    res.status(EResponseCode.INTERNAL_ERROR).json({
                        success: false,
                        error: true,
                        errorMessage: 'Unknown error',
                    });
                }
            }
        }

        server[method](path, response);
    }
}
