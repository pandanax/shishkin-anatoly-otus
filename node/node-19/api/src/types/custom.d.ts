import {IUser} from '../entities/user/types';
import {Request} from 'express';

export interface IRequest extends Request {
    user?: IUser
}
