import db from '../models/index.js';
import {ICreateUserDto, IUpdateUserDto, IUserDto} from '../dto/user.dto';

const User = db.User;

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

export {
    getAll,
    getById,
    findByEmail,
    create,
    update,
    remove
}
