import config from '../../configs/env'
import {COMMON_FETCH_PARAMS} from '../helpers';
import {IAuthData, IAuthResult} from '../types';
import {storage} from '../../services/storage';

const {baseApiUrl} = config;

const auth = async ({email, password}: IAuthData): Promise<IAuthResult> => {
    try {

        const response = await fetch(`${baseApiUrl}user`, {
            ...COMMON_FETCH_PARAMS,
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            body: JSON.stringify({email, password}) // body data type must match "Content-Type" header
        });
        return await response.json().then(({success, data, errorMessage}) => {
            if (success) {
                storage.setToken(data);
                return {
                    success: true,
                    errorMessage: '',
                }
            }
            return {
                success: false,
                errorMessage,
            }
        }); // parses JSON response into native JavaScript objects
    } catch (e) {
        if (e instanceof Error) {
            return {
                success: false,
                errorMessage: e.message,
            }
        }
        return {
            success: false,
            errorMessage: 'Unknown Error',
        }
    }

};

export default auth;
