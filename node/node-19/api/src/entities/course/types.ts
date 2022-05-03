import {Document} from 'mongoose';
import {IUser} from '../user/types';

export interface ICourse extends Document {
    id: string,
    title: string,
    description: string,
    userId: IUser['id'],
    accessUserIds: IUser['id'][],
}

export interface ICourseData {
    title: ICourse['title']
    description: ICourse['description']
    userId: IUser['id']
    id?: string
    access?: string[],
    userIds?: IUser['id'][],
}



