import UserRepository from '../../domain/repositories/UserRepository.js';
import User from '../../domain/entities/User.js';
import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    name: String,
    email: String,
    password: String
});

const UserModel = model('User', userSchema);

class MongoUserRepository extends UserRepository {
    async create(user) {
        const newUser = new UserModel(user);
        await newUser.save();
        return new User(newUser._id, newUser.name, newUser.email, newUser.password);
    }
}

export default MongoUserRepository;
