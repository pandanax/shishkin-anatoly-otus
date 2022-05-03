import {useMutation} from 'react-query';
import auth from '../../fetches/user/auth';
import {IAuthData, IAuthResult} from '../../fetches/types';

export default function useMutationUserAuth(onSuccessCallback: (data: IAuthResult ) => void) {
    const {
        data,
        error,
        isError,
        isIdle,
        isLoading,
        isPaused,
        isSuccess,
        mutate,
        mutateAsync,
        reset,
        status,
    } = useMutation((params: IAuthData) => auth(params), {
        mutationKey: 'useMutationUserAuth',
        onError: (e) => console.error('onError', e),
        onSuccess: (data: IAuthResult) => onSuccessCallback(data),
    })

    return {
        data,
        error,
        isError,
        isIdle,
        isLoading,
        isPaused,
        isSuccess,
        mutate,
        mutateAsync,
        reset,
        status,
    }

}
