import {ICommonFetchParams, IErrorResponse, IStdResult, ISuccessResponse} from './types';
import {storage} from '../services/storage';

export const COMMON_FETCH_PARAMS: ICommonFetchParams = {
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
        'Content-Type': 'application/json'
    },
}

export const getCommonFetchParamsWithAuth: () => ICommonFetchParams = () => ({
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${storage.getToken()}`
    },
})


export const successResponse = ({success, data, errorMessage} : ISuccessResponse): IStdResult  => {
    if (success) {
        return {
            success: true,
            data,
            errorMessage: '',
        };
    } else {
        return {
            success: false,
            errorMessage: String(errorMessage),
        }
    }
}

export const errorResponse = (e: string | typeof Error): IStdResult => {
    if (e instanceof Error) {
        return {
            success: false,
            errorMessage: e.message,
        }
    }
    return {
        success: false,
        errorMessage: String(e),
    }
}
