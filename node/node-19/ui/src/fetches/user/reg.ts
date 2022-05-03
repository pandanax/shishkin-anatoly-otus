import config from '../../configs/env'
import {COMMON_FETCH_PARAMS} from '../helpers';
import {IRegData, IRegResult} from '../types';

const {baseApiUrl} = config;

const reg = async ({email, password, firstName, lastName}: IRegData): Promise<IRegResult> => {
    try {

        const response = await fetch(`${baseApiUrl}user`, {
            ...COMMON_FETCH_PARAMS,
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            body: JSON.stringify({email, password, firstName, lastName}) // body data type must match "Content-Type" header
        });
        return await response.json().then(({success, data, errorMessage}) => {
            if (success) {
                return {
                    success: true,
                    errorMessage: '',
                };
            } else {
                return {
                    success: false,
                    errorMessage,
                }
            }
        }); // parses JSON response into native JavaScript objects
    } catch (e: any) {
        if (e instanceof Error) {
            return {
                success: false,
                errorMessage: e.message,
            }
        }
        return {
            success: false,
            errorMessage: e,
        }

    }

};

export default reg;
