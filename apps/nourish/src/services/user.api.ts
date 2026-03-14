import {api} from "./api/client";
import {AxiosResponse} from "axios";

interface IUser {
    id: number;
    email: string;
    passwordHash: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const getUsers = async () => {
    const response: AxiosResponse<IUser[]> = await api.get('/api/users/');
    console.log('Response data:', response.data);
    return response.data;
};

const getUserById = async (id: number) => {
    const response: AxiosResponse<IUser> = await api.get(`/api/users/${id}`);
    return response.data;
};

const createUser = async (data: IUser) => {
    const response: AxiosResponse<IUser> = await api.post(`/api/users`, data);
}

const updateUser = async (user: IUser) => {
    const response: AxiosResponse<{ statusText: string }> = await api.put(`/api/users/${user.id}`, user);
}

const deleteUser = async (id: number) => {
    const response: AxiosResponse<{ statusText: string }> = await api.delete(`/api/users/${id}`);
}

export type {IUser};
export {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};