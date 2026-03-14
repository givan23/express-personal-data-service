import {useQuery} from '@tanstack/react-query';
import {getUsers} from "../../../services/user.api";

const useUsersQuery = () => {
    return useQuery({
        queryKey: ['users'],
        queryFn: getUsers,
    });
}

export {useUsersQuery};
