const router = require('express').Router();
const c = require('../controllers/userController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

router.post('/register', c.register);
router.post('/login', c.login);
router.get('/', verifyToken, isAdmin, c.getAllUsers);

module.exports = router;