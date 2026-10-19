const router = require('express').Router();
const c = require('../controllers/kamarController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/', c.getAllKamar);
router.post('/', verifyToken, c.createKamar);
router.put('/:id', verifyToken, c.updateKamar);

module.exports = router;