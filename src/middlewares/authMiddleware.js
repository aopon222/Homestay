const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const auth = req.headers['authorization'];
    const token = auth && auth.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Token tidak disediakan' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Token tidak valid' });
        req.user = decoded;
        next();
    });
};

exports.isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin')
        return res.status(403).json({ message: 'Hanya Admin' });
    next();
};