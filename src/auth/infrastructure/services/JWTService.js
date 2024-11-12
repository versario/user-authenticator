import jwt from 'jsonwebtoken';

class JWTService {
    constructor(secret) {
        this.secret = secret;
    }

    generateToken(userId) {
        return jwt.sign({ userId }, this.secret, { expiresIn: '1h' });
    }

    verifyToken(token) {
        try {
            return jwt.verify(token, this.secret);
        } catch (error) {
            console.error('Token verification failed:', error);
            return null;
        }
    }
}

export default JWTService;
