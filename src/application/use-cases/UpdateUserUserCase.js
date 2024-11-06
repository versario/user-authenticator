import User from '../../domain/entities/User.js';
class UpdateUserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute(userData) {
        const user = new User(userData.id, userData.name, userData.email, userData.password);
        if (!user.id) {
            throw new Error("User ID is required");
        }
        const updatedUser = await this.userRepository.update(user);
        if (!updatedUser) {
            throw new Error("User not found");
        }
        return updatedUser;
    }
}

export default UpdateUserUseCase;
