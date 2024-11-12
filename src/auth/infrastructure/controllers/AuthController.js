import RegisterUseCase from '../../application/use-cases/RegisterUseCase.js';
import LoginUseCase from '../../application/use-cases/LoginUseCase.js';
import CreateUserUseCase from '../../../user/application/use-cases/CreateUserUseCase.js';

class AuthController {
    constructor(authRepository, userRepository, jwtService) {
        const createUserUseCase = new CreateUserUseCase(userRepository);
        this.registerUseCase = new RegisterUseCase(createUserUseCase, jwtService);
        this.loginUseCase = new LoginUseCase(authRepository, jwtService);
    }

    async register(req, res) {
        const { name, email, password } = req.body;
        try {
            const { user, token } = await this.registerUseCase.execute({ name, email, password });
            res.status(201).json({ user, token });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async login(req, res) {
        const { email, password } = req.body;
        try {
            const { user, token } = await this.loginUseCase.execute(email, password);
            res.status(200).json({ user, token });
        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    }
}

export default AuthController;
