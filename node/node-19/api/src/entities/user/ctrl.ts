import {inject, injectable} from 'tsyringe';
import {IUserService} from './service'
import {EUserRole, IAuthData, IRegData, IUser, TToken} from './types';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {userNormalize} from './schema';
import bcrypt from 'bcrypt';
import {EResponseCode, ExtendedError, ExtendedErrorInput} from '../../types/express-additionals';

dotenv.config();

export interface IUserCtrl {
    list(): Promise<IUser[]>

    login(params: IAuthData): Promise<TToken>

    register(params: IRegData): Promise<IUser>
}

export class UserError extends ExtendedError {
    constructor(p: ExtendedErrorInput) {
        super(p);
        this.name = 'UserError'
    }
};

@injectable()
export class UserCtrl implements IUserCtrl {
    constructor(
        @inject('UserService') public readonly userService: IUserService
    ) {
    }

    list(): Promise<IUser[]> {
        return this.userService.list()
            .then((users: IUser[]) => users.map(userNormalize))
    }

    async login({email, password}: IAuthData): Promise<TToken> {
        const user = await this.userService.findUserByEmail(email);
        if (!user) {
            throw new UserError({code: EResponseCode.BAD_REQUEST, message: 'Wrong credentials'})
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            throw new UserError({code: EResponseCode.BAD_REQUEST, message: 'Wrong credentials'})
        }

        return jwt.sign({
            user: userNormalize(user),
        }, process.env.TOKEN_SECRET, {expiresIn: '7d'});

    }

    async register({email, password, firstName, lastName}: IRegData): Promise<IUser> {

        const user = await this.userService.findUserByEmail(email);

        if (user) {
            throw new UserError({
                code: EResponseCode.BAD_REQUEST,
                message: 'This email already registered'
            })
        }

        const regPwd = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

        if (!regPwd.test(password)) {

            throw new UserError({
                code: EResponseCode.BAD_REQUEST,
                message: `Bad password: 
            \n a digit must occur at least once
            \n a lower case letter must occur at least once
            \n anything, at least eight places though
            `
            })
        }

        const pwd = await bcrypt.hash(password, 10);

        return this.userService
            .register({
                email,
                password: pwd,
                firstName,
                lastName,
                roles: [EUserRole.USER]
            })
            .then(userNormalize)
    }

}
