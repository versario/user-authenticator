class LoginUseCase {
    constructor(authRepository, jwtService) {
        this.authRepository = authRepository;
        this.jwtService = jwtService;
    }

    async execute(email, password) {
        const user = await this.authRepository.login(email, password);
        if (!user) throw new Error("Invalid credentials");
        const token = this.jwtService.generateToken(user.id);
        return { user, token };
    }
}

export default LoginUseCase;