import dotenv from 'dotenv';
import { Router } from 'express';
import AuthController from '../controllers/AuthController.js';
import MongoAuthRepository from '../repositories/MongoAuthRepository.js';
import { MongoUserRepository } from '../../../user/infrastructure/repositories/MongoUserRepository.js';
import JWTService from '../services/JWTService.js';

dotenv.config();
const router = Router();
const authRepository = new MongoAuthRepository();
const userRepository = new MongoUserRepository();
const jwtService = new JWTService(process.env.JWT_SECRET);
const authController = new AuthController(authRepository, userRepository, jwtService);

router.post('/register', (req, res) => authController.register(req, res));
router.post('/login', (req, res) => authController.login(req, res));

export default router;

/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterUser:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The user's name
 *         email:
 *           type: string
 *           description: The user's email
 *         password:
 *           type: string
 *           description: The user's password
 *       required:
 *         - name
 *         - email
 *         - password
 *     LoginUser:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: The user's email
 *         password:
 *           type: string
 *           description: The user's password
 *       required:
 *         - email
 *         - password
 * 
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterUser'
 *     responses:
 *       201:
 *         description: User registered successfully
 *       500:
 *         description: Internal Server Error
 * 
 * /auth/login:
 *   post:
 *     summary: Log in an existing user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginUser'
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Invalid credentials
 */
