import { container } from 'tsyringe';

import {IUserCtrl, UserCtrl} from './entities/user/ctrl'
import { UserService, IUserService } from './entities/user/service'

import {CourseCtrl, ICourseCtrl} from './entities/course/ctrl'
import { CourseService, ICourseService } from './entities/course/service'

container.registerSingleton<IUserService>('UserService', UserService)
container.registerSingleton<IUserCtrl>('UserCtrl', UserCtrl)

container.registerSingleton<ICourseService>('CourseService', CourseService)
container.registerSingleton<ICourseCtrl>('CourseCtrl', CourseCtrl)

