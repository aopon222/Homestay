const router = require('express').Router();
const c = require('../controllers/pembayaranController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/', verifyToken, c.createPembayaran);
router.get('/reservasi/:id_reservasi', verifyToken, c.getByReservasi);

module.exports = router;
