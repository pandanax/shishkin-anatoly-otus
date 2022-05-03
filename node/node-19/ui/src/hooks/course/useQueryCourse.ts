import {useQuery} from 'react-query';
import getCourse from '../../fetches/course/get';

export default function useQueryCourse(id: string) {
    const {
        data,
        error,
        isError,
        isIdle,
        isLoading,
        isSuccess,
        status,
        refetch,
    } = useQuery('useQueryCourse', getCourse(id), {
        cacheTime: 1000,
        retry: 0,
    })

    return {
        data,
        error,
        isError,
        isIdle,
        isLoading,
        isSuccess,
        status,
        refetch,
    }

}
