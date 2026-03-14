import {useMutation} from '@tanstack/react-query';
import {updateUser} from "../../../services/user.api";
import type {IUser} from "../../../services/user.api";

const useUpdateUserMutation = (user: IUser) => {
    return useMutation({
        mutationFn: () => updateUser(user),
        onSuccess: (data) => {
            console.log('User updated successfully:', data);
        },
        onError: (error) => {
            console.error('Error updating user:', error);
        },
    });
}

export {useUpdateUserMutation};