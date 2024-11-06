import UserRepository from '../../domain/repositories/UserRepository.js';
import User from '../../domain/entities/User.js';
import { Schema, model, Types } from 'mongoose';

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
    async findById(id) {
        if (!Types.ObjectId.isValid(id)) return null;
        const foundUser = await UserModel.findById(id);
        if (!foundUser) return null;
        return new User(foundUser._id, foundUser.name, foundUser.email, foundUser.password);
    }
    async update(user) {
        if (!Types.ObjectId.isValid(user.id)) return null;
        const updatedUser = await UserModel.findByIdAndUpdate(
            user.id,
            {
                name: user.name,
                email: user.email,
                password: user.password
            },
            { new: true }
        );
        if (!updatedUser) return null;
        return new User(updatedUser._id, updatedUser.name, updatedUser.email, updatedUser.password);
    }
}

export default MongoUserRepository;
