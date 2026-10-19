const router = require('express').Router();

router.use('/users', require('./userRoutes'));
router.use('/kamar', require('./kamarRoutes'));
router.use('/tamu', require('./tamuRoutes'));
router.use('/reservasi', require('./reservasiRoutes'));
router.use('/pembayaran', require('./pembayaranRoutes'));
router.use('/checkin', require('./checkinRoutes'));
router.use('/laporan', require('./laporanRoutes'));

module.exports = router;