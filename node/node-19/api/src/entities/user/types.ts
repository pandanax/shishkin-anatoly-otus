import {Document} from 'mongoose';

export type TToken = string;

export type TUserPassword = string;

export type TEmail = string;
export type TId = string;

export interface IUser extends Document {
    id: TId,
    email: TEmail;
    firstName: string;
    lastName: string;
    password?: TUserPassword;
    roles: EUserRole[]
}

export interface IAuthData {
    email: IUser['email']
    password: TUserPassword
}

export interface IRegData {
    email: IUser['email']
    password: TUserPassword
    firstName: IUser['firstName']
    lastName: IUser['lastName'],
    roles: EUserRole[]
}

export enum EUserRole {
    USER = "USER",
    ADMIN = "ADMIN",
}

export type TDecoded = {
    user: IUser,
}
