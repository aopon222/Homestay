const router = require('express').Router();
const c = require('../controllers/laporanController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

router.get('/', verifyToken, isAdmin, c.getAllLaporan);
router.post('/generate', verifyToken, isAdmin, c.generateLaporan);

module.exports = router;
