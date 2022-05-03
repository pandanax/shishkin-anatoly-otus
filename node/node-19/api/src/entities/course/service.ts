import {injectable} from 'tsyringe';
import CourseModel from './model';
import {ICourse, ICourseData} from './types';
import {courseNormalize} from './schema';
import {userNormalize} from '../user/schema';
import {IUser} from '../user/types';

export interface ICourseService {
    list(userId?: string): Promise<ICourse[]>

    add(params: ICourseData): Promise<ICourse>
    getById(id: ICourseData['id']): Promise<ICourse>

    update(params: ICourseData): Promise<any>
}

@injectable()
export class CourseService implements ICourseService {
    list(userId?: string): Promise<ICourse[]> {
        const filter: {
            userId?: string,
        } = {};
        if (userId) {
            filter.userId = userId;
        }
        return CourseModel.find(filter)
            .populate('userId')
            .populate('accessUserIds')
            .then((courses: ICourse[]) => courses.map((course: ICourse) => ({
                ...courseNormalize(course),
                description: userId ? course.description : undefined,
                userId: userNormalize(course.userId as unknown as IUser),
                accessUserIds: course.accessUserIds.map((user : unknown) => userNormalize(user as unknown as IUser))
            })))
            .then((c: unknown) => c as ICourse[])
    }

    add(params: ICourseData): Promise<ICourse> {
        return CourseModel.create(params);
    }

    getById(id: string): Promise<ICourse> {
        return CourseModel.findById(id)
            .populate('userId')
            .populate('accessUserIds')
            .then((course: ICourse) => ({
                ...courseNormalize(course),
                userId: userNormalize(course.userId as unknown as IUser),
                accessUserIds: course.accessUserIds.map((user : unknown) => userNormalize(user as unknown as IUser))
            }))
            .then((c: unknown) => c as ICourse)

    }

    update(params: ICourseData): Promise<any> {
        return CourseModel.updateOne({_id: params.id}, {
            $set: {
                title: params.title,
                description: params.description,
                accessUserIds: params.userIds,
            }
        }).then(c => c);
    }

}
