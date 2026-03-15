import express from 'express';
import {
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
} from './user.controller';

const router = express.Router();

router.post('/', createUser);
router.get('/', getUsers);

router.get('/profiles', getUserProfilesController);
router.get('/:userId/profile', getUserProfileByIdController);
router.post('/:userId/profile', createUserProfileController);
router.put('/:userId/profile', updateUserProfileController);
router.delete('/:userId/profile', deleteUserProfileController);

router.get('/preferences', getUserPreferencesController);
router.get('/:userId/preference', getUserPreferenceByIdController);
router.post('/:userId/preference', createUserPreferenceController);
router.put('/:userId/preference', updateUserPreferenceController);
router.delete('/:userId/preference', deleteUserPreferenceController);

router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
