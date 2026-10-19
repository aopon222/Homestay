const router = require('express').Router();
const c = require('../controllers/checkinController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/checkin', verifyToken, c.checkIn);
router.post('/checkout', verifyToken, c.checkOut);

module.exports = router;
