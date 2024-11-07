export default function(jwtService) {
    return (req, res, next) => {
        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'Access Denied' });
        
        const payload = jwtService.verifyToken(token);
        if (!payload) return res.status(401).json({ message: 'Invalid Token' });

        req.userId = payload.userId;
        next();
    };
};
