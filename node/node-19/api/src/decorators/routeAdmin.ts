import {Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import {EUserRole, TDecoded} from '../entities/user/types';
import {UserError} from '../entities/user/ctrl';
import {EResponseCode} from '../types/express-additionals';

export function routeAdmin(): MethodDecorator {
    return function (
        target: Object,
        propertyKey: string | symbol,
        descriptor: PropertyDescriptor
    ) {
        const original = descriptor.value;

        descriptor.value = function (...args: any[]) {
            let request = args[0] as Request;
            let response = args[1] as Response;

            const {
                headers,
            } = request;

            if (headers.authorization && headers.authorization.split(' ')[0] === 'Bearer') {
                const token = headers.authorization.split(' ')[1];
                const {user} = jwt.verify(token, process.env.TOKEN_SECRET) as TDecoded;
                const {roles} = user;
                if (!roles.includes(EUserRole.ADMIN)) {
                    throw new UserError({code: EResponseCode.FORBIDDEN, message: 'Forbidden'})
                }
            }


            return original.apply(this, args);
        }
    };
}
