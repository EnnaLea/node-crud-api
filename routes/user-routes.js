import usersController from '../controllers/users-controllers.js';
import express from 'express';

const router = express.Router()

//console.log("usersController:", usersController); // Debugging

// CRUD ROUTES


// GET ALL
router.get('/', (req, res) => {
    usersController.getAllUsers(req, res);
}); // /users

// GET USER
router.get('/:userId', (req, res) => usersController.getUserById(req, res)); // /users/:userId

// CREATE USER
router.post('/', (req, res) => usersController.createUser(req, res)); // /users

//UPDATE USER
router.put('/:userId', (req, res) => usersController.updateUser(req, res)); // /users/:userId

//DELETE USER
router.delete('/:userId', (req, res) => usersController.deleteUser(req, res)); // /users/:userId


export default router;
