class UserController {
    constructor(createUserUseCase) {
        this.createUserUseCase = createUserUseCase;
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
}

export default UserController;
