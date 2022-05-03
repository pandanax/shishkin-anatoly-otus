import {injectable} from 'tsyringe';
import UserModel from './model';
import {IRegData, IUser} from './types';

export interface IUserService {
    list(): Promise<IUser[]>

    register(params: IRegData): Promise<IUser>

    findUserByEmail(email: IUser['email']): Promise<IUser>
}

@injectable()
export class UserService implements IUserService {
    list(): Promise<IUser[]> {
        return UserModel.find().then((users: IUser[]) => users);
    }

    register(params: IRegData): Promise<IUser> {
        return UserModel.create(params);
    }

    findUserByEmail(email: IUser['email']): Promise<IUser> {
        return UserModel.findOne({email}).then((user: IUser) => user);
    }

    findUserById(id: IUser['id']): Promise<IUser> {
        return UserModel.findById(id).then((user: IUser) => user);
    }

}
