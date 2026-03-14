import {useMutation} from '@tanstack/react-query';
import {createUser} from "../../../services/user.api";
import type {IUser} from "../../../services/user.api";

const useUpdateUserMutation = (user: IUser) => {
    return useMutation({
        mutationFn: () => createUser(user),
        onSuccess: (data) => {
            console.log('User created successfully:', data);
        },
        onError: (error) => {
            console.error('Error creating user:', error);
        },
    });
}

export {useUpdateUserMutation};