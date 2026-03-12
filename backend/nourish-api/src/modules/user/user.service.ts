import * as userRepository from './user.repository';
import {ICreateUserDto, IUpdateUserDto, IUserDto} from './user.dto';

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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    console.log('Email ricevuta:', data.email);
    console.log('Regex test:', emailRegex.test(data.email));
    if (!emailRegex.test(data.email)) {
        const error = new Error('Invalid email format');
        (error as any).status = 400;
        throw error;
    }
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