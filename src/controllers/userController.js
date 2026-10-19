const { User } = require('../../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { nama, email, password, role } = req.body;
    try {
        const exist = await User.findOne({ where: { email } });
        if (exist) return res.status(400).json({ message: 'Email sudah terdaftar' });
        const password_hash = await bcrypt.hash(password, 10);
        const user = await User.create({ nama, email, password_hash, role: role || 'resepsionis' });
        res.status(201).json({ id: user.id, nama: user.nama, email: user.email, role: user.role });
    } catch (e) { res.status(500).json({ error: e.message }); }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });
        const ok = await bcrypt.compare(password, user.password_hash);
        if (!ok) return res.status(401).json({ message: 'Password salah' });
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, user: { id: user.id, nama: user.nama, role: user.role } });
    } catch (e) { res.status(500).json({ error: e.message }); }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({ attributes: { exclude: ['password_hash'] } });
        res.json(users);
    } catch (e) { res.status(500).json({ error: e.message }); }
};