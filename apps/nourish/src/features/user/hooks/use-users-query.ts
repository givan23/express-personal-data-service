import {useQuery} from '@tanstack/react-query';
import {getUsers} from "../../../services/user.api";

const useUsers = () => {
    return useQuery({
        queryKey: ['users'],
        queryFn: getUsers,
    });
}

export {useUsers};
