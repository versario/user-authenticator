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
