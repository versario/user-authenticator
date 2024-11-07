class RegisterUseCase {
    constructor(createUserUseCase, jwtService) {
        this.createUserUseCase = createUserUseCase;
        this.jwtService = jwtService;
    }

    async execute(userData) {
        const user = await this.createUserUseCase.execute(userData);
        const token = this.jwtService.generateToken(user.id);
        return { user, token };
    }
}

export default RegisterUseCase;
