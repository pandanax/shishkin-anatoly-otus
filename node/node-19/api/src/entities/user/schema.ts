import {Schema} from 'mongoose';
import {IUser} from './types';

export const UserSchema: Schema = new Schema({
    email: {type: String, required: true, unique: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    password: {type: String, required: true},
    roles: [{
        type: String
    }]
});

export const userNormalize = ({id, email, firstName, lastName, roles} : IUser) =>
    ({id, email, firstName, lastName, roles}) as IUser
