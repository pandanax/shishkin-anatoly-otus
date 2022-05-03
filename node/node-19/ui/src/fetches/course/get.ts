import config from '../../configs/env'
import {COMMON_FETCH_PARAMS, getCommonFetchParamsWithAuth} from '../helpers';

const {baseApiUrl} = config;

const getCourse =  (id: string) => async () => {
    try {

        const response = await fetch(`${baseApiUrl}course?id=${id}`, {
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

export default getCourse
