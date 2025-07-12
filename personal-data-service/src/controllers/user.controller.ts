import {Request, Response, NextFunction} from 'express';
import * as userService from '../services/user.service';
import {ICreateUserDto, IUpdateUserDto, IUserDto} from "../dto/user.dto";

const getUsers = async (req: Request, res: Response<IUserDto[]>, next: NextFunction) => {
    try {
        const users = await userService.getUsers();
        res.json(users);
    } catch (err: any) {
        next(err);
    }
};

const getUserById = async (req: Request<{ id: string }>, res: Response<IUserDto>, next: NextFunction) => {
    try {
        const user = await userService.getUserById(req.params.id);
        res.json(user);
    } catch (err: any) {
        next(err);
    }
};

const createUser = async (req: Request<ICreateUserDto>, res: Response<IUserDto>, next: NextFunction) => {
    try {
        const user = await userService.createUser(req.body);
        res.json(user);
    } catch (err: any) {
        next(err);
    }
};

const updateUser = async (req: Request<{
    id: string
}, {}, IUpdateUserDto>, res: Response<IUserDto>, next: NextFunction) => {
    try {
        const user = await userService.updateUser(req.params.id, req.body);
        res.json(user);
    } catch (err: any) {
        next(err);
    }
};

const deleteUser = async (req: Request<{
    id: string
}, {}, {}>, res: Response<Record<string, string>>, next: NextFunction) => {
    try {
        const result = await userService.deleteUser(req.params.id);
        res.json(result);
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
