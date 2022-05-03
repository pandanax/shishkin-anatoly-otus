import {container, inject, injectable} from 'tsyringe';
import {ICourseService} from './service'
import {ICourse, ICourseData,} from './types';
import dotenv from 'dotenv';
import {EResponseCode, ExtendedError, ExtendedErrorInput} from '../../types/express-additionals';
import {courseNormalize} from './schema';
import {IUserService} from '../user/service';
import {IUser} from '../user/types';

dotenv.config();

export interface ICourseCtrl {
    list(userId?: string): Promise<ICourse[]>
    getByIdWithUserId({userId, id}: {userId: string, id: string}): Promise<ICourse>
    add(params: ICourseData): Promise<ICourse>
    update(params: ICourseData): Promise<ICourse>
}

export class CourseError extends ExtendedError {
    constructor(p: ExtendedErrorInput) {
        super(p);
        this.name = 'CourseError'
    }
};

@injectable()
export class CourseCtrl implements ICourseCtrl {
    constructor(
        @inject('CourseService') public readonly courseService: ICourseService,
        @inject('UserService') public readonly userService: IUserService
) {
    }

    list(userId?: string): Promise<ICourse[]> {
        return this.courseService.list(userId)
            .then((courses: ICourse[]) => courses.map(courseNormalize))
    }

    async getByIdWithUserId({userId, id}: {userId: string, id: string}): Promise<ICourse> {
        if (!id) {
            throw new CourseError({code: EResponseCode.BAD_REQUEST, message: 'Нет id'})
        }
        const course = await this.courseService.getById(id)
            .then(courseNormalize);

        // @ts-ignore
        if (course.accessUserIds.map(({id}: IUser) => id).includes(userId)) {
            return course
        } else {
            throw new CourseError({code: EResponseCode.FORBIDDEN, message: 'Нет доступа'})
        }

    }

    async add({title, description, userId}: ICourseData): Promise<ICourse> {
        if (!title) {
            throw new CourseError({code: EResponseCode.BAD_REQUEST, message: 'Нет названия'})
        }
        if (!description) {
            throw new CourseError({code: EResponseCode.BAD_REQUEST, message: 'Нет описания'})
        }
        return this.courseService
            .add({
                title,
                description,
                userId,
            })
            .then(courseNormalize)
    }

    async update({title, description, userId, id, access: rawAccess}: ICourseData): Promise<ICourse> {
        let emails: string[] = [];
        let userIds: string[] = [];
        if (Array.isArray(rawAccess)) {
            const userPromises = Promise.all(rawAccess.map(email => this.userService.findUserByEmail(email)))
            const users = await userPromises;
            emails = users.filter((u: IUser) => !!u).map(({email}: IUser) => email);
            userIds = users.filter((u: IUser) => !!u).map(({id}: IUser) => id);
        }
        if (!title) {
            throw new CourseError({code: EResponseCode.BAD_REQUEST, message: 'Нет названия'})
        }
        if (!description) {
            throw new CourseError({code: EResponseCode.BAD_REQUEST, message: 'Нет описания'})
        }
        return this.courseService
            .update({
                title,
                description,
                userId,
                id,
                userIds,
            })
            .then(courseNormalize)
    }

}
