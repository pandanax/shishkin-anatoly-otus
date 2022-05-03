import {useQuery} from 'react-query';
import getCourseList from '../../fetches/course/list';
import getCourseMyList from '../../fetches/course/my';

export default function useQueryCourses(my?: boolean) {
    const {
        data,
        error,
        isError,
        isIdle,
        isLoading,
        isSuccess,
        status,
        refetch,
    } = useQuery('useQueryCourses', my ? getCourseMyList : getCourseList, {
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
