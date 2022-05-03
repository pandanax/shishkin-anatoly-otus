import config from '../../configs/env'
import {getCommonFetchParamsWithAuth} from '../helpers';

const {baseApiUrl} = config;

const getCourseList = async () => {
    try {

        const response = await fetch(`${baseApiUrl}course/list/my`, {
            ...getCommonFetchParamsWithAuth(),
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
        });
        return await response.json().then(({success, data, errorMessage}) => {
            if (success) {
                return data;
            } else throw Error(errorMessage);
        });
    } catch (e) {
        return undefined
    }

};

export default getCourseList