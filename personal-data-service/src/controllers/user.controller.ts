import db from '../models/index.js';

const User = db.User;

const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({message: 'User not found'});
        }
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

const updateUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            await user.update(req.body);
            res.json(user);
        } else {
            res.status(404).json({message: 'User not found'});
        }
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            await user.destroy();
            res.json({message: 'User deleted successfully'});
        } else {
            res.status(404).json({message: 'User not found'});
        }
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

export {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
};
