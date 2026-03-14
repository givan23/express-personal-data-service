import {useMutation} from '@tanstack/react-query';
import {createUser, IUser} from "../../../services/user.api";

const useUsersQuery = (user: IUser) => {
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

export {useUsersQuery};