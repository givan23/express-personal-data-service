import * as userRepository from '../repositories/user.repository.js';
import {ICreateUserDto, IUpdateUserDto, IUserDto} from '../dto/user.dto.js';

const getUsers = async (): Promise<IUserDto[]> => {
    return await userRepository.getAll();
}

const getUserById = async (id: string): Promise<IUserDto> => {
    const user = await userRepository.getById(id);
    if (!user) {
        const error = new Error('User not found');
        (error as any).status = 404;
        throw error;
    }
    return user;
}

const createUser = async (data: ICreateUserDto): Promise<IUserDto> => {
    try {
        return await userRepository.create(data);
    } catch (err: any) {
        if (err.name === 'SequelizeUniqueConstraintError') {
            const error = new Error('User with this email already exists');
            (error as any).status = 400;
            throw error;
        }
        throw err;
    }
}

const updateUser = async (id: string, data: IUpdateUserDto): Promise<IUserDto> => {
    const user = await userRepository.update(id, data);
    if (!user) {
        const error = new Error('User not found');
        (error as any).status = 404;
        throw error;
    }
    return user;
};

const deleteUser = async (id: string): Promise<{ message: string }> => {
    const deleted = await userRepository.remove(id);
    if (!deleted) {
        const error = new Error('User not found');
        (error as any).status = 404;
        throw error;
    }
    return { message: 'User deleted successfully' };
};

export {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}