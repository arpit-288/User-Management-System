import express from "express";
import { registerUser, login, getAllUsers, getUserByID, updateUser, deleteUser, refreshToken } from '../controllers/user.controller';
import { authenticationToken, authenticationRole } from "../middleware/auth.middleware";
import { loginSchema, registerUserSchema, updateUserSchema } from "../schemas/userValidationSchema";
import { validateSchema } from "../middleware/schemaValidation.middleware";
import { rateLimiting } from "../middleware/ratelimiting.middleware";


const router = express.Router();


// Authentication API for User

router.post('/register', rateLimiting, validateSchema(registerUserSchema), registerUser);

router.post('/login', rateLimiting, validateSchema(loginSchema), login);


// All the API for User

router.get('/', authenticationToken, authenticationRole('admin'), getAllUsers);

router.get('/:id', authenticationToken, authenticationRole('admin'), getUserByID);

router.put('/:id', authenticationToken, authenticationRole('admin'), validateSchema(updateUserSchema), updateUser);

router.delete('/:id', authenticationToken, authenticationRole('admin'), deleteUser);


// Refresh Token

router.post('/refresh-token',rateLimiting, refreshToken);





export default router;