import User from '../../domain/entities/User.js';
class CreateUserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute(userData) {
        const user = new User(null, userData.name, userData.email, userData.password);
        return await this.userRepository.create(user);
    }
}

export default CreateUserUseCase;
