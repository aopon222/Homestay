// Pastikan 'sequelize' ada di dalam kurung kurawal ini
const { Laporan, Reservasi, Pembayaran, sequelize } = require('../../models');

exports.generateLaporan = async (req, res) => {
    const { periode, dibuat_oleh } = req.body; // format: '2025-12'
    try {
        // 1. Hitung jumlah reservasi di periode tersebut
        const totalReservasi = await Reservasi.count({
            where: sequelize.where(
                sequelize.fn('TO_CHAR', sequelize.col('tanggal_masuk'), 'YYYY-MM'),
                periode
            )
        });

        // 2. Ambil semua data pembayaran di periode tersebut
        const dataPembayaran = await Pembayaran.findAll({
            include: [{
                model: Reservasi,
                attributes: [], // kosongkan agar tidak mengambil data reservasi
                where: sequelize.where(
                    sequelize.fn('TO_CHAR', sequelize.col('tanggal_masuk'), 'YYYY-MM'),
                    periode
                )
            }]
        });

        // 3. Jumlahkan total pendapatan menggunakan JavaScript
        const totalPendapatan = dataPembayaran.reduce((total, item) => total + Number(item.jumlah), 0);

        // 4. Simpan ke tabel Laporan
        const laporan = await Laporan.create({
            tanggal: new Date(),
            periode,
            sumber_booking: 'Sistem',
            total_pendapatan: totalPendapatan,
            jumlah_reservasi: totalReservasi,
            dibuat_pada: new Date(),
            dibuat_oleh
        });

        res.status(201).json(laporan);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

// Jangan lupa fungsi untuk GET Laporan (jika sebelumnya sudah Anda buat, biarkan saja. Jika belum, ini tambahannya)
exports.getAllLaporan = async (req, res) => {
    try {
        const laporan = await Laporan.findAll({
            order: [['tanggal', 'DESC']]
        });
        res.json(laporan);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};