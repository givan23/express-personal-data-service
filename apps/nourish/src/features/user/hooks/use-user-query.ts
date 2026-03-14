import {useQuery} from '@tanstack/react-query';
import {getUserById} from "../../../services/user.api";

const useUsersQuery = (id: number) => {
    return useQuery({
        queryKey: ['user', id],
        queryFn: () => getUserById(id),
        enabled: Number.isFinite(id),
    });
}

export {useUsersQuery};