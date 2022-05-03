import {IUser} from '../user';

export interface ICourse {
    description: string
    id: string
    title: string
    userId?: IUser,
    accessUserIds?: IUser[]
}
