import {useMutation} from '@tanstack/react-query';
import {deleteUser} from "../../../services/user.api";

const useDeleteUserMutation = (id: number) => {
    return useMutation({
        mutationFn: () => deleteUser(id),
        onSuccess: (data) => {
            console.log('User deleted successfully:', data);
        },
        onError: (error) => {
            console.error('Error deleting user:', error);
        },
    });
}

export {useDeleteUserMutation};