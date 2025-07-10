import {Request, Response, NextFunction} from 'express';
import db from '../models/index.js';
import {ICreateUserDto, IUpdateUserDto, IUserDto} from "../dto/user.dto";

const User = db.User;

const createUser = async (req: Request<ICreateUserDto>, res: Response<IUserDto>, next: NextFunction) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (err: any) {
        next(err);
    }
};

const getUsers = async (req: Request, res: Response<IUserDto[]>, next: NextFunction) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (err: any) {
        next(err);
    }
};

const getUserById = async (req: Request, res: Response<IUserDto>, next: NextFunction) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            res.json(user);
        } else {
            const err = new Error('User not found');
            (err as any).status = 404;
            next(err);
        }
    } catch (err: any) {
        next(err);
    }
};

const updateUser = async (req: Request<{
    id: string
}, {}, IUpdateUserDto>, res: Response<IUserDto>, next: NextFunction) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            await user.update(req.body);
            res.json(user);
        } else {
            const err = new Error('User not found');
            (err as any).status = 404;
            next(err);
        }
    } catch (err: any) {
        next(err);
    }
};

const deleteUser = async (req: Request<{
    id: string
}, {}, {}>, res: Response<Record<string, string>>, next: NextFunction) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            await user.destroy();
            res.json({message: 'User deleted successfully'});
        } else {
            const err = new Error('User not found');
            (err as any).status = 404;
            next(err);
        }
    } catch (err: any) {
        next(err);
    }
};

export {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
};
