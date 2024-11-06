class DeleteUserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute(userId) {
        if (!userId) {
            throw new Error("User ID is required");
        }
        const success = await this.userRepository.delete(userId);
        if (!success) {
            throw new Error("User not found");
        }
        return success;
    }
}

export default DeleteUserUseCase;
