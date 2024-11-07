import dotenv from 'dotenv';
import { Router } from 'express';
import CreateUserUseCase from '../../application/use-cases/CreateUserUseCase.js';
import FindUserByIdUseCase from '../../application/use-cases/FindUserByIdUseCase.js';
import UpdateUserUseCase from '../../application/use-cases/UpdateUserUserCase.js';
import DeleteUserUseCase from '../../application/use-cases/DeleteUserUseCase.js';
import UserController from '../controllers/UserController.js';
import { MongoUserRepository } from '../repositories/MongoUserRepository.js';
import authMiddleware from '../../../auth/infrastructure/middleware/AuthMiddleware.js';
import JWTService from '../../../auth/infrastructure/services/JWTService.js';

dotenv.config();
const router = Router();
const jwtService = new JWTService(process.env.JWT_SECRET);

const userRepository = new MongoUserRepository();
const createUserUseCase = new CreateUserUseCase(userRepository);
const findUserByIdUseCase = new FindUserByIdUseCase(userRepository);
const updateUserUseCase = new UpdateUserUseCase(userRepository);
const deleteUserUseCase = new DeleteUserUseCase(userRepository);
const userController = new UserController(createUserUseCase, findUserByIdUseCase, updateUserUseCase, deleteUserUseCase);

router.use(authMiddleware(jwtService));

router.post('/', (req, res) => userController.createUser(req, res));
router.get('/:id', (req, res) => userController.findUserById(req, res));
router.put('/:id', (req, res) => userController.updateUser(req, res));
router.delete('/:id', (req, res) => userController.deleteUser(req, res));

export default router;
