import UserRepository from '../../domain/repositories/UserRepository.js';
import User from '../../domain/entities/User.js';
import { Schema, model, Types } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const UserModel = model('User', userSchema);

class MongoUserRepository extends UserRepository {
    async create(user) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const newUser = new UserModel({ ...user, password: hashedPassword });
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
        const updateData = {};
        if (user.name) updateData.name = user.name;
        if (user.email) updateData.email = user.email;
        if (user.password) {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            updateData.password = hashedPassword;
        }
        const updatedUser = await UserModel.findByIdAndUpdate(
            user.id,
            updateData,
            { new: true }
        );
        if (!updatedUser) return null;
        return new User(updatedUser._id, updatedUser.name, updatedUser.email, updatedUser.password);
    }
    async delete(id) {
        if (!Types.ObjectId.isValid(id)) return false;
        const deletedUser = await UserModel.findByIdAndDelete(id);
        return !!deletedUser;
    }
}

export { MongoUserRepository, UserModel };
