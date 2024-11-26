import UserController from '../src/user/infrastructure/controllers/UserController.js';

describe('UserController', () => {
    let userController;
    let mockCreateUserUseCase, mockFindUserByIdUseCase, mockUpdateUserUseCase, mockDeleteUserUseCase;
    let mockReq, mockRes;

    beforeEach(() => {
        mockCreateUserUseCase = { execute: jest.fn() };
        mockFindUserByIdUseCase = { execute: jest.fn() };
        mockUpdateUserUseCase = { execute: jest.fn() };
        mockDeleteUserUseCase = { execute: jest.fn() };

        userController = new UserController(
            mockCreateUserUseCase,
            mockFindUserByIdUseCase,
            mockUpdateUserUseCase,
            mockDeleteUserUseCase
        );

        mockReq = {};
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    describe('createUser', () => {
        it('should return 201 and the created user on success', async () => {
            const mockUser = { id: '1', name: 'John Doe', email: 'john.doe@example.com' };
            mockCreateUserUseCase.execute.mockResolvedValue(mockUser);

            mockReq.body = { name: 'John Doe', email: 'john.doe@example.com', password: '123456' };

            await userController.createUser(mockReq, mockRes);

            expect(mockCreateUserUseCase.execute).toHaveBeenCalledWith(mockReq.body);
            expect(mockRes.status).toHaveBeenCalledWith(201);
            expect(mockRes.json).toHaveBeenCalledWith(mockUser);
        });

        it('should return 400 and an error message on failure', async () => {
            const mockError = new Error('E11000 duplicate key error collection: users.users index: name_1 dup key: { name: \"John Doe\" }');
            mockCreateUserUseCase.execute.mockRejectedValue(mockError);

            mockReq.body = { name: 'John Doe' };

            await userController.createUser(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith({ error: mockError.message });
        });
    });

    describe('findUserById', () => {
        it('should return 200 and the user on success', async () => {
            const mockUser = { id: '1', name: 'John Doe', email: 'john.doe@example.com' };
            mockFindUserByIdUseCase.execute.mockResolvedValue(mockUser);

            mockReq.params = { id: '1' };

            await userController.findUserById(mockReq, mockRes);

            expect(mockFindUserByIdUseCase.execute).toHaveBeenCalledWith('1');
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith(mockUser);
        });

        it('should return 404 and an error message on failure', async () => {
            const mockError = new Error('User not found');
            mockFindUserByIdUseCase.execute.mockRejectedValue(mockError);

            mockReq.params = { id: '1' };

            await userController.findUserById(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(404);
            expect(mockRes.json).toHaveBeenCalledWith({ error: mockError.message });
        });
    });

    describe('updateUser', () => {
        it('should return 200 and the updated user on success', async () => {
            const mockUpdatedUser = { id: '1', name: 'John Smith', email: 'john.smith@example.com', password: 'hashed654321' };
            mockUpdateUserUseCase.execute.mockResolvedValue(mockUpdatedUser);

            mockReq.params = { id: '1' };
            mockReq.body = { name: 'John Smith', email: 'john.smith@example.com', password: '654321' };

            await userController.updateUser(mockReq, mockRes);

            expect(mockUpdateUserUseCase.execute).toHaveBeenCalledWith({ id: '1', ...mockReq.body });
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({
                updated: 'Yes',
                user: mockUpdatedUser
            });
        });

        it('should return 404 if the user is not found', async () => {
            const mockError = new Error('User not found');
            mockUpdateUserUseCase.execute.mockRejectedValue(mockError);

            mockReq.params = { id: '1' };
            mockReq.body = { name: 'John Smith' };

            await userController.updateUser(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(404);
            expect(mockRes.json).toHaveBeenCalledWith({ message: 'User not found' });
        });
    });

    describe('deleteUser', () => {
        it('should return 200 on successful deletion', async () => {
            mockDeleteUserUseCase.execute.mockResolvedValue();

            mockReq.params = { id: '1' };

            await userController.deleteUser(mockReq, mockRes);

            expect(mockDeleteUserUseCase.execute).toHaveBeenCalledWith('1');
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({ message: 'User deleted successfully' });
        });

        it('should return 404 if the user is not found', async () => {
            const mockError = new Error('User not found');
            mockDeleteUserUseCase.execute.mockRejectedValue(mockError);

            mockReq.params = { id: '1' };

            await userController.deleteUser(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(404);
            expect(mockRes.json).toHaveBeenCalledWith({ message: 'User not found' });
        });
    });
});
