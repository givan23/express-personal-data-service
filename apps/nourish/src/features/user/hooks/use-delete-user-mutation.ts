import {useMutation} from '@tanstack/react-query';
import {updateUser, IUser} from "../../../services/user.api";

const useUpdateUserMutation = (user: IUser) => {
    return useMutation({
        mutationFn: () => updateUser(user),
        onSuccess: (data) => {
            console.log('User created successfully:', data);
        },
        onError: (error) => {
            console.error('Error creating user:', error);
        },
    });
}

export {useUpdateUserMutation};