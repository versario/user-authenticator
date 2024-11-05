class FindUserByIdUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute(userId) {
        if (!userId) {
            throw new Error("User ID is required");
        }
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    }
}

export default FindUserByIdUseCase;
