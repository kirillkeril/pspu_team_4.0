import {Router} from "express";
import userController from "../controllers/user.controller.js";
import {body} from 'express-validator';
import authMiddleware from "../middleware/auth.middleware.js";

const usersRouter = Router();


// Simple register users
usersRouter.post('/register',
    body('email').isEmail(),
    body('password').isLength({min: 8, max: 128}),
    userController.registration);

usersRouter.post('/login', userController.login);

usersRouter.post('/logout', userController.logout);

usersRouter.get('/refresh', userController.refresh);

usersRouter.get('/activate/:link', userController.activate);
// Test users router
usersRouter.get('/', authMiddleware, userController.getUsers);

export default usersRouter;