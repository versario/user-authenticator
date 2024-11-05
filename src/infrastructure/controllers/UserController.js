class UserController {
    constructor(createUserUseCase, findUserByIdUseCase) {
        this.createUserUseCase = createUserUseCase;
        this.findUserByIdUseCase = findUserByIdUseCase;
    }

    async createUser(req, res) {
        const userData = req.body;
        try {
            const user = await this.createUserUseCase.execute(userData);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async findUserById(req, res) {
        const userId = req.params.id;
        try {
            const user = await this.findUserByIdUseCase.execute(userId);
            res.status(200).json(user);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }
}

export default UserController;
