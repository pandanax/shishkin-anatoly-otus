import {useQuery} from 'react-query';
import getCurrentUser from '../../fetches/user/getCurrentUser';

export default function useQueryCurrentUser() {
    const {
        data,
        error,
        isError,
        isIdle,
        isLoading,
        isSuccess,
        status,
        refetch,
    } = useQuery('useQueryCurrentUser', getCurrentUser, {
        cacheTime: 0,
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
