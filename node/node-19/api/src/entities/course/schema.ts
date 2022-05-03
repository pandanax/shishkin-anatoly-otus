import {Schema} from 'mongoose';
import {ICourse} from './types';

export const CourseSchema: Schema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    userId:{type: Schema.Types.ObjectId, ref: 'User'},
    accessUserIds:[{type: Schema.Types.ObjectId, ref: 'User'}]
});

export const courseNormalize = ({id, title, description, userId, accessUserIds} : ICourse) =>
    ({id, title, description, userId, accessUserIds}) as ICourse
