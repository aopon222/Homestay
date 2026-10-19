const router = require('express').Router();
const c = require('../controllers/tamuController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/', verifyToken, c.getAllTamu);
router.post('/', verifyToken, c.createTamu);

module.exports = router;
