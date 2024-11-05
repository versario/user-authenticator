import dotenv from 'dotenv';
import express, { json } from 'express';
import { connect } from 'mongoose';
import MongoUserRepository from './src/infrastructure/repositories/MongoUserRepository.js';
import CreateUserUseCase from './src/application/use-cases/CreateUserUseCase.js';
import FindUserByIdUseCase from './src/application/use-cases/FindUserByIdUseCase.js'; './src/application/use-cases/FindUserByIdUseCase.js';
import UserController from './src/infrastructure/controllers/UserController.js';

dotenv.config();
connect(process.env.MONGODB_URI);

const app = express();
app.use(json());

const userRepository = new MongoUserRepository();
const createUserUseCase = new CreateUserUseCase(userRepository);
const findUserByIdUseCase = new FindUserByIdUseCase(userRepository);
const userController = new UserController(createUserUseCase, findUserByIdUseCase);

app.post('/users', (req, res) => userController.createUser(req, res));
app.get('/users/:id', (req, res) => userController.findUserById(req, res));

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
