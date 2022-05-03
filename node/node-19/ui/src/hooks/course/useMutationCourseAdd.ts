import {useMutation} from 'react-query';
import add from '../../fetches/course/add';
import {IAddCourseRequestData, IStdResult} from '../../fetches/types';

export default function useMutationCourseAdd(onSuccessCallback: (result: IStdResult) => void) {
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
    } = useMutation((params: IAddCourseRequestData) => add(params), {
        mutationKey: 'useMutationCourseAdd',
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
