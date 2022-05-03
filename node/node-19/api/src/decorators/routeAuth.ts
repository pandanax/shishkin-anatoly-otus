import jwt from 'jsonwebtoken';
import {TDecoded} from '../entities/user/types';
import {UserError} from '../entities/user/ctrl';
import {EResponseCode} from '../types/express-additionals';
import {IRequest} from '../types/custom';


export function routeAuth(): MethodDecorator {
    return function (
        target: Object,
        propertyKey: string | symbol,
        descriptor: PropertyDescriptor
    ) {
        const original = descriptor.value;

        descriptor.value = function (...args: any[]) {
            const request = args[0] as IRequest;

            const {
                headers,
            } = request;

            if (headers.authorization && headers.authorization.split(' ')[0] === 'Bearer') {
                const token = headers.authorization.split(' ')[1];
                const {user} = jwt.verify(token, process.env.TOKEN_SECRET) as TDecoded;
                if (!user) {
                    throw new UserError({code: EResponseCode.FORBIDDEN, message: 'Forbidden'})
                }
                request.user = user;
            }

            return original.apply(this, args);
        }
    };
}
