import { Request, Response, NextFunction } from 'express';
import * as userService from './user.service';
import {
    ICreateUserDto,
    ICreateUserPreferenceDto,
    ICreateUserProfileDto,
    IUpdateUserDto,
    IUpdateUserPreferenceDto,
    IUpdateUserProfileDto,
    IUserDto,
    IUserPreferenceDto,
    IUserProfileDto
} from './user.dto';

const parseUserIdsQuery = (userIdsQuery: string | string[] | undefined): number[] => {
    const raw = Array.isArray(userIdsQuery) ? userIdsQuery.join(',') : userIdsQuery;

    if (!raw) {
        const error = new Error('userIds query param is required');
        (error as any).status = 400;
        throw error;
    }

    const userIds = raw
        .split(',')
        .map(id => Number(id.trim()))
        .filter(id => !Number.isNaN(id));

    if (userIds.length === 0) {
        const error = new Error('userIds query param must contain valid numeric ids');
        (error as any).status = 400;
        throw error;
    }

    return userIds;
};

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

const createUser = async (
    req: Request<{}, {}, ICreateUserDto>,
    res: Response<IUserDto>,
    next: NextFunction
) => {
    try {
        const user = await userService.createUser(req.body);
        res.json(user);
    } catch (err: any) {
        next(err);
    }
};

const updateUser = async (
    req: Request<{ id: string }, {}, IUpdateUserDto>,
    res: Response<IUserDto>,
    next: NextFunction
) => {
    try {
        const user = await userService.updateUser(req.params.id, req.body);
        res.json(user);
    } catch (err: any) {
        next(err);
    }
};

const deleteUser = async (
    req: Request<{ id: string }>,
    res: Response<Record<string, string>>,
    next: NextFunction
) => {
    try {
        const result = await userService.deleteUser(req.params.id);
        res.json(result);
    } catch (err: any) {
        next(err);
    }
};

const getUserProfilesController = async (
    req: Request<{}, {}, {}, { userIds?: string | string[] }>,
    res: Response<IUserProfileDto[]>,
    next: NextFunction
) => {
    try {
        const userIds = parseUserIdsQuery(req.query.userIds);
        const profiles = await userService.getUserProfilesService(userIds);
        res.json(profiles);
    } catch (err: any) {
        next(err);
    }
};

const getUserProfileByIdController = async (
    req: Request<{ userId: string }>,
    res: Response<IUserProfileDto>,
    next: NextFunction
) => {
    try {
        const preference = await userService.getUserProfileByIdService(Number(req.params.userId));
        res.json(preference);
    } catch (err: any) {
        next(err);
    }
};

const createUserProfileController = async (
    req: Request<{ userId: string }, {}, Partial<ICreateUserProfileDto>>,
    res: Response<IUserProfileDto>,
    next: NextFunction
) => {
    try {
        const profile = await userService.createUserProfileService(Number(req.params.userId), req.body);
        res.json(profile);
    } catch (err: any) {
        next(err);
    }
};

const updateUserProfileController = async (
    req: Request<{ userId: string }, {}, Partial<IUpdateUserProfileDto>>,
    res: Response<IUserProfileDto | null>,
    next: NextFunction
) => {
    try {
        const profile = await userService.updateUserProfileService(Number(req.params.userId), req.body);
        res.json(profile);
    } catch (err: any) {
        next(err);
    }
};

const deleteUserProfileController = async (
    req: Request<{ userId: string }>,
    res: Response<Record<string, string>>,
    next: NextFunction
) => {
    try {
        const result = await userService.deleteUserProfileService(Number(req.params.userId));
        res.json(result);
    } catch (err: any) {
        next(err);
    }
};

const getUserPreferencesController = async (
    req: Request<{}, {}, {}, { userIds?: string | string[] }>,
    res: Response<IUserPreferenceDto[]>,
    next: NextFunction
) => {
    try {
        const userIds = parseUserIdsQuery(req.query.userIds);
        const preferences = await userService.getUserPreferencesService(userIds);
        res.json(preferences);
    } catch (err: any) {
        next(err);
    }
};

const getUserPreferenceByIdController = async (
    req: Request<{ userId: string }>,
    res: Response<IUserPreferenceDto>,
    next: NextFunction
) => {
    try {
        const preference = await userService.getUserPreferenceByIdService(Number(req.params.userId));
        res.json(preference);
    } catch (err: any) {
        next(err);
    }
};

const createUserPreferenceController = async (
    req: Request<{ userId: string }, {}, Partial<ICreateUserPreferenceDto>>,
    res: Response<IUserPreferenceDto>,
    next: NextFunction
) => {
    try {
        const preference = await userService.createUserPreferenceService(Number(req.params.userId), req.body);
        res.json(preference);
    } catch (err: any) {
        next(err);
    }
};

const updateUserPreferenceController = async (
    req: Request<{ userId: string }, {}, Partial<IUpdateUserPreferenceDto>>,
    res: Response<IUserPreferenceDto | null>,
    next: NextFunction
) => {
    try {
        const preference = await userService.updateUserPreferenceService(Number(req.params.userId), req.body);
        res.json(preference);
    } catch (err: any) {
        next(err);
    }
};

const deleteUserPreferenceController = async (
    req: Request<{ userId: string }>,
    res: Response<Record<string, string>>,
    next: NextFunction
) => {
    try {
        const result = await userService.deleteUserPreferenceService(Number(req.params.userId));
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
    deleteUser,
    getUserProfilesController,
    getUserProfileByIdController,
    createUserProfileController,
    updateUserProfileController,
    deleteUserProfileController,
    getUserPreferencesController,
    getUserPreferenceByIdController,
    createUserPreferenceController,
    updateUserPreferenceController,
    deleteUserPreferenceController
};