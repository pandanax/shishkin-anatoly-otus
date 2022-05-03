import {useMutation} from 'react-query';
import edit from '../../fetches/course/edit';
import {IAddCourseRequestData, IStdResult} from '../../fetches/types';

export default function useMutationCourseEdit(onSuccessCallback: (result: IStdResult) => void) {
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
    } = useMutation((params: IAddCourseRequestData) => edit(params), {
        mutationKey: 'useMutationCourseEdit',
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
