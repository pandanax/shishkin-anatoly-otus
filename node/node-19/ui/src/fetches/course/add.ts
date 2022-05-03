import config from '../../configs/env'
import {errorResponse, getCommonFetchParamsWithAuth, successResponse} from '../helpers';
import {IAddCourseRequestData, IStdResult, ISuccessResponse} from '../types';

const {baseApiUrl} = config;

const add = async ({title, description}: IAddCourseRequestData): Promise<IStdResult> => {
    try {

        const response = await fetch(`${baseApiUrl}course`, {
            ...getCommonFetchParamsWithAuth(),
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            body: JSON.stringify({title, description}) // body data type must match "Content-Type" header
        });
        return await response.json().then((p: ISuccessResponse) => successResponse(p)); // parses JSON response into native JavaScript objects
    } catch (e: any) {
        return errorResponse(e)
    }

};

export default add;
