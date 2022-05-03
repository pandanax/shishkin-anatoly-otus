import {useMutation} from 'react-query';
import reg from '../../fetches/user/reg';
import {IRegData, IRegResult} from '../../fetches/types';

export default function useMutationUserReg(onSuccessCallback: (e: IRegResult) => void) {
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
    } = useMutation((params: IRegData) => reg(params), {
        mutationKey: 'useMutationUserReg',
        onError: (e) => console.error('onError', e),
        onSuccess: onSuccessCallback,
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
