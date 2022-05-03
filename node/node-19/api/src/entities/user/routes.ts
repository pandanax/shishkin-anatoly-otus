import {Express, Request, Response} from 'express';
import {container} from 'tsyringe';
import {METHOD, routeConfig, routeLog, routeAdmin, routeAuth} from '../../decorators'
import {UserCtrl} from './ctrl'
import {IAuthData, IRegData} from './types';
import {IRequest} from '../../types/custom';
const userCtrl = container.resolve<UserCtrl>('UserCtrl')

export default {
    register(server: Express) {
        class UserRoutes {

            // Получить всех пользователей
            @routeAdmin()
            @routeLog()
            @routeConfig({
                server,
                method: METHOD.GET,
                path: '/api/user/list'
            })
            public list() {
                return userCtrl.list();
            }

            // Получить себя
            @routeAuth()
            @routeLog()
            @routeConfig({
                server,
                method: METHOD.GET,
                path: '/api/user'
            })
            public get(req: IRequest) {
                return req.user;
            }

            // Регистрация пользователя
            @routeLog()
            @routeConfig({
                server,
                method: METHOD.PUT,
                path: '/api/user'
            })
            public register(req: Request, res: Response) {
                return userCtrl.register({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: req.body.password,
                } as IRegData);
            }

            // Логин пользователя
            @routeLog()
            @routeConfig({
                server,
                method: METHOD.POST,
                path: '/api/user/'
            })
            public login(req: Request, res: Response) {
                return userCtrl.login({
                    email: req.body.email,
                    password: req.body.password,
                } as IAuthData);
            }

        }
    }
}
