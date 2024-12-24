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

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
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
 * 
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 *       401:
 *          description: Access Denied | Invalid Token
 * 
 *   put:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name
 *               email:
 *                 type: string
 *                 description: The user's email
 *               password:
 *                 type: string
 *                 description: The user's password
 *             example:
 *               name: Juan Perez
 *               email: juan.perez@example.com
 *               password: secretpassword
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 updated:
 *                   type: string
 *                   example: Yes
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *       404:
 *         description: User not found
 *       401:
 *         description: Access Denied | Invalid Token
 *       500:
 *          description: An error occurred
 *
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user's ID
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       401:
 *          description: Access Denied | Invalid Token
 *
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User deleted successfully
 *       404:
 *         description: User not found
 *       401:
 *         description: Access Denied | Invalid Token
 *       500:
 *          description: An error occurred
 */
