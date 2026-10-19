const router = require('express').Router();
const c = require('../controllers/reservasiController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/', verifyToken, c.getAllReservasi);
router.post('/', verifyToken, c.createReservasi);

module.exports = router;
