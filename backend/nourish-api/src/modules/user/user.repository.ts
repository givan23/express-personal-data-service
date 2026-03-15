import {Op} from 'sequelize';
import sequelizeBootstrap from '../../database/sequelize.bootstrap';
import {
    ICreateUserDto, ICreateUserPreferenceDto,
    ICreateUserProfileDto,
    IUpdateUserDto, IUpdateUserPreferenceDto,
    IUpdateUserProfileDto,
    IUserDto, IUserPreferenceDto,
    IUserProfileDto
} from './user.dto';

const User = sequelizeBootstrap.User;
const UserProfile = sequelizeBootstrap.userProfile;
const UserPreference = sequelizeBootstrap.userPreference;

const getAll = async (): Promise<IUserDto[]> => {
    return await User.findAll();
};

const getById = async (id: string): Promise<IUserDto> => {
    return await User.findByPk(id);
};

const findByEmail = async (email: string): Promise<IUserDto> => {
    return await User.findOne({where: {email}});
};

const create = async (data: ICreateUserDto): Promise<IUserDto> => {
    return await User.create(data);
};

const update = async (id: string, data: IUpdateUserDto): Promise<IUserDto | null> => {
    const [updatedCount] = await User.update(data, {where: {id}});
    if (updatedCount === 0) return null;
    return await User.findByPk(id);
};

const remove = async (id: string): Promise<boolean> => {
    const deletedCount = await User.destroy({where: {id}});
    return deletedCount > 0;
};

const getUserProfiles = async (userIds: number[]): Promise<IUserProfileDto[]> => {
    return await UserProfile.findAll({where: {userId: {[Op.in]: userIds}}});
};

const getUserProfileById = async (userId: number): Promise<IUserProfileDto | null> => {
    return await UserProfile.findOne({where: {userId}});
};

const createUserProfile = async (
    userId: number,
    data: Omit<Partial<ICreateUserProfileDto>, 'userId'>
): Promise<IUserProfileDto> => {
    return await UserProfile.create({...data, userId});
}

const updateUserProfile = async (
    userId: number,
    data: Partial<IUpdateUserProfileDto>
): Promise<IUserProfileDto | null> => {
    const [updatedCount] = await UserProfile.update(data, {where: {userId}});
    if (updatedCount === 0) return null;
    return await UserProfile.findOne({where: {userId}});
};

const deleteUserProfile = async (userId: number): Promise<boolean> => {
    const deletedCount = await UserProfile.destroy({where: {userId}});
    return deletedCount > 0;
};

const getUserPreferences = async (userIds: number[]): Promise<IUserPreferenceDto[]> => {
    return await UserPreference.findAll({where: {userId: {[Op.in]: userIds}}});
}

const getUserPreferenceById = async (userId: number): Promise<IUserPreferenceDto | null> => {
    return await UserPreference.findOne({where: {userId}});
};

const createUserPreference = async (
    userId: number,
    data: Omit<Partial<ICreateUserPreferenceDto>, 'userId'>
): Promise<IUserPreferenceDto> => {
    return await UserPreference.create({...data, userId});
}

const updateUserPreference = async (
    userId: number,
    data: Partial<IUpdateUserPreferenceDto>
): Promise<IUserPreferenceDto | null> => {
    const [updatedCount] = await UserPreference.update(data, {where: {userId}});
    if (updatedCount === 0) return null;
    return await UserPreference.findOne({where: {userId}});
}

const deleteUserPreference = async (userId: number): Promise<boolean> => {
    const deletedCount = await UserPreference.destroy({where: {userId}});
    return deletedCount > 0;
}

export {
    getAll,
    getById,
    findByEmail,
    create,
    update,
    remove,
    getUserProfileById,
    getUserProfiles,
    createUserProfile,
    updateUserProfile,
    deleteUserProfile,
    getUserPreferenceById,
    getUserPreferences,
    createUserPreference,
    updateUserPreference,
    deleteUserPreference
}
