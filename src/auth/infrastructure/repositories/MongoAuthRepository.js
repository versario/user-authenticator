import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import AuthRepository from '../../domain/AuthRepository.js';
import { MongoUserRepository, UserModel } from '../../../user/infrastructure/repositories/MongoUserRepository.js';

class MongoAuthRepository extends AuthRepository {

    async register(userData) {
        const userRepository = new MongoUserRepository();
        return await userRepository.create(userData);
    }

    async login(email, password) {
        const user = await UserModel.findOne({ email });
        if (!user) return null;
        const isPasswordCorrect = await compare(password, user.password);
        if (!isPasswordCorrect) return null;
        return user;
    }

    async verifyToken(token) {
        try {
            return jwt.verify(token, this.jwtSecret);
        } catch (error) {
            return null;
        }
    }
}

export default MongoAuthRepository;
