import * as userRepository from './user.repository';
import {
    ICreateUserDto, ICreateUserPreferenceDto,
    ICreateUserProfileDto,
    IUpdateUserDto, IUpdateUserPreferenceDto,
    IUpdateUserProfileDto,
    IUserDto, IUserPreferenceDto,
    IUserProfileDto
} from './user.dto';

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
    return {message: 'User deleted successfully'};
};

const getUserProfilesService = async (userIds?: number[]): Promise<IUserProfileDto[]> => {
    return await userRepository.getUserProfiles(userIds);
}

const getUserProfileByIdService = async (userId: number): Promise<IUserProfileDto | undefined> => {
    const userProfile = await userRepository.getUserProfileById(userId);
    if (!userProfile) {
        const error = new Error('User profile not found');
        (error as any).status = 404;
        throw error;
    }
    return userProfile;
}

const createUserProfileService = async (
    userId: number,
    data: Omit<Partial<ICreateUserProfileDto>, 'userId'>
): Promise<IUserProfileDto> => {
    return await userRepository.createUserProfile(userId, data);
}

const updateUserProfileService = async (
    userId: number,
    data: Partial<IUpdateUserProfileDto>
): Promise<IUserProfileDto | null> => {
    const userProfile = await userRepository.updateUserProfile(userId, data);
    if (!userProfile) {
        const error = new Error('User profile not found');
        (error as any).status = 404;
        throw error;
    }
    return userProfile;
}

const deleteUserProfileService = async (userId: number): Promise<{ message: string }> => {
    const deleted = await userRepository.deleteUserProfile(userId);
    if (!deleted) {
        const error = new Error('User profile not found');
        (error as any).status = 404;
        throw error;
    }
    return {message: 'User profile deleted successfully'};
}

const getUserPreferencesService = async (userIds?: number[]): Promise<IUserPreferenceDto[]> => {
    return await userRepository.getUserPreferences(userIds);
}

const getUserPreferenceByIdService = async (userId: number): Promise<IUserPreferenceDto | undefined> => {
    const userPreference = await userRepository.getUserPreferenceById(userId);
    if (!userPreference) {
        const error = new Error('User preference not found');
        (error as any).status = 404;
        throw error;
    }
    return userPreference;
}

const createUserPreferenceService = async (
    userId: number,
    data: Omit<Partial<ICreateUserPreferenceDto>, 'userId'>
): Promise<IUserPreferenceDto> => {
    return await userRepository.createUserPreference(userId, data);
}

const updateUserPreferenceService = async (
    userId: number,
    data: Partial<IUpdateUserPreferenceDto>
): Promise<IUserPreferenceDto | null> => {
    const userPreference = await userRepository.updateUserPreference(userId, data);
    if (!userPreference) {
        const error = new Error('User preference not found');
        (error as any).status = 404;
        throw error;
    }
    return userPreference;
}

const deleteUserPreferenceService = async (userId: number): Promise<{ message: string }> => {
    const deleted = await userRepository.deleteUserPreference(userId);
    if (!deleted) {
        const error = new Error('User preference not found');
        (error as any).status = 404;
        throw error;
    }
    return {message: 'User preference deleted successfully'};
}


export {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getUserProfilesService,
    getUserProfileByIdService,
    createUserProfileService,
    updateUserProfileService,
    deleteUserProfileService,
    getUserPreferencesService,
    getUserPreferenceByIdService,
    createUserPreferenceService,
    updateUserPreferenceService,
    deleteUserPreferenceService
}