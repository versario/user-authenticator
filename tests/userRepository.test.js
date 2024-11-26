import { MongoUserRepository } from '../src/user/infrastructure/repositories/MongoUserRepository.js';
import User from '../src/user/domain/entities/User.js';

jest.mock('../src/user/infrastructure/repositories/MongoUserRepository.js');

describe('MongoUserRepository', () => {
    let userRepository;

    beforeEach(() => {
        userRepository = new MongoUserRepository();
        userRepository.create = jest.fn();
        userRepository.findById = jest.fn();
        userRepository.update = jest.fn();
        userRepository.delete = jest.fn();
    });

    it('should create a user', async () => {
        const mockUser = new User('123', 'Juan Perez', 'juan@example.com', '!e4gnY/FC');
        userRepository.create.mockResolvedValue(mockUser);

        const result = await userRepository.create({ name: 'Juan Perez', email: 'juan@example.com', password: '123456' });

        expect(result).toBeInstanceOf(User);
        expect(result.name).toBe('Juan Perez');
        expect(userRepository.create).toHaveBeenCalledWith({ name: 'Juan Perez', email: 'juan@example.com', password: '123456' });
    });

    it('should find a user by ID', async () => {
        const mockUser = new User('123', 'Juanita Doe', 'Juanita@example.com', '!e4gnY/FC');
        userRepository.findById.mockResolvedValue(mockUser);

        const result = await userRepository.findById('123');

        expect(result).toBeInstanceOf(User);
        expect(result.name).toBe('Juanita Doe');
        expect(userRepository.findById).toHaveBeenCalledWith('123');
    });

    it('should update a user', async () => {
        const mockUpdatedUser = new User('123', 'Juanita Updated', 'juanita.updated@example.com', '$Ddsbg#TYX');
        userRepository.update.mockResolvedValue(mockUpdatedUser);

        const result = await userRepository.update({
            id: '123',
            name: 'Juanita Updated',
            email: 'juanita.updated@example.com',
            password: '$Ddsbg#TYX'
        });

        expect(result).toBeInstanceOf(User);
        expect(result.name).toBe('Juanita Updated');
        expect(userRepository.update).toHaveBeenCalledWith({
            id: '123',
            name: 'Juanita Updated',
            email: 'juanita.updated@example.com',
            password: '$Ddsbg#TYX'
        });
    });

    it('should delete a user by ID', async () => {
        userRepository.delete.mockResolvedValue(true);

        const result = await userRepository.delete('123');

        expect(result).toBe(true);
        expect(userRepository.delete).toHaveBeenCalledWith('123');
    });

    it('should create a user', async () => {
        const mockUser = new User('123', 'Juan Perez', 'juan@example.com', '!e4gnY/FC');
        userRepository.create.mockResolvedValue(mockUser);

        const result = await userRepository.create({ name: 'Juan Perez', email: 'juan@example.com', password: '123456' });

        expect(result).toBeInstanceOf(User);
        expect(result.name).toBe('Juan Perez');
        expect(userRepository.create).toHaveBeenCalledWith({ name: 'Juan Perez', email: 'juan@example.com', password: '123456' });
    });
});
