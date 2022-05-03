import mongoose from 'mongoose';
import {UserSchema} from './schema';
import {IUser} from './types';

export default mongoose.model<IUser>('User', UserSchema);
