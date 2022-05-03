import mongoose from 'mongoose';
import {CourseSchema} from './schema';
import {ICourse} from './types';

export default mongoose.model<ICourse>('Course', CourseSchema);
