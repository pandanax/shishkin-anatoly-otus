import {Express, Response} from 'express';
import {container} from 'tsyringe';
import {METHOD, routeAuth, routeConfig, routeLog} from '../../decorators'
import {CourseCtrl} from './ctrl'
import {ICourseData} from './types';
import {IRequest} from '../../types/custom';

const courseCtrl = container.resolve<CourseCtrl>('CourseCtrl')

export default {
    register(server: Express) {
        class CourseRoutes {

            // Получить все курсы
            @routeLog()
            @routeConfig({
                server,
                method: METHOD.GET,
                path: '/api/course/list'
            })
            public list() {
                return courseCtrl.list();
            }

            // Получить один курс
            @routeAuth()
            @routeLog()
            @routeConfig({
                server,
                method: METHOD.GET,
                path: '/api/course'
            })
            public getOne(req: IRequest, res: Response) {
                return courseCtrl.getByIdWithUserId({
                        userId: req.user.id,
                        id: req.query.id as string,
                    }
                );
            }

            // Получить все курсы
            @routeAuth()
            @routeLog()
            @routeConfig({
                server,
                method: METHOD.GET,
                path: '/api/course/list/my'
            })
            public my(req: IRequest, res: Response) {
                return courseCtrl.list(req.user.id);
            }

            // Добавить курс
            @routeAuth()
            @routeLog()
            @routeConfig({
                server,
                method: METHOD.PUT,
                path: '/api/course'
            })
            public add(req: IRequest, res: Response) {
                return courseCtrl.add({
                    title: req.body.title,
                    description: req.body.description,
                    userId: req.user.id,
                } as ICourseData);
            }

            // Изменить курс
            @routeAuth()
            @routeLog()
            @routeConfig({
                server,
                method: METHOD.PATCH,
                path: '/api/course'
            })
            public edit(req: IRequest, res: Response) {
                return courseCtrl.update({
                    title: req.body.title,
                    description: req.body.description,
                    userId: req.user.id,
                    id: req.body.id,
                    access: req.body.access
                } as ICourseData);
            }

        }
    }
}
