import dotenv from 'dotenv';
import express, { json } from 'express';
import { connect } from 'mongoose';
import MongoUserRepository from './src/user/infrastructure/repositories/MongoUserRepository.js';
import CreateUserUseCase from './src/user/application/use-cases/CreateUserUseCase.js';
import FindUserByIdUseCase from './src/user/application/use-cases/FindUserByIdUseCase.js';
import UpdateUserUseCase from './src/user/application/use-cases/UpdateUserUserCase.js';
import DeleteUserUseCase from './src/user/application/use-cases/DeleteUserUseCase.js';
import UserController from './src/user/infrastructure/controllers/UserController.js';

dotenv.config();
connect(process.env.MONGODB_URI);

const app = express();
app.use(json());

const userRepository = new MongoUserRepository();
const createUserUseCase = new CreateUserUseCase(userRepository);
const findUserByIdUseCase = new FindUserByIdUseCase(userRepository);
const updateUserUseCase = new UpdateUserUseCase(userRepository);
const deleteUserUseCase = new DeleteUserUseCase(userRepository);
const userController = new UserController(createUserUseCase, findUserByIdUseCase, updateUserUseCase, deleteUserUseCase);

app.post('/users', (req, res) => userController.createUser(req, res));
app.get('/users/:id', (req, res) => userController.findUserById(req, res));
app.put('/users/:id', (req, res) => userController.updateUser(req, res));
app.delete('/users/:id', (req, res) => userController.deleteUser(req, res));

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
