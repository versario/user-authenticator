class UserController {
    constructor(createUserUseCase, findUserByIdUseCase, updateUserUseCase) {
        this.createUserUseCase = createUserUseCase;
        this.findUserByIdUseCase = findUserByIdUseCase;
        this.updateUserUseCase = updateUserUseCase;
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

    async updateUser(req, res) {
        const { id } = req.params;
        const { name, email, password } = req.body;
        try {
            const updatedUser = await this.updateUserUseCase.execute({ id, name, email, password });
            res.status(200).json({
                updated: 'Yes',
                user: updatedUser
            });
        } catch (error) {
            error.message === "User not found" ? 
            res.status(404).json({ message: "User not found" }) : 
            res.status(500).json({ message: "An error occurred", error: error.message });
        }
    }
}

export default UserController;
