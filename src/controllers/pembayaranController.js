const { Pembayaran } = require('../../models');

exports.createPembayaran = async (req, res) => {
    try { res.status(201).json(await Pembayaran.create(req.body)); }
    catch (e) { res.status(500).json({ error: e.message }); }
};

exports.getByReservasi = async (req, res) => {
    try {
        res.json(await Pembayaran.findAll({ where: { id_reservasi: req.params.id_reservasi } }));
    } catch (e) { res.status(500).json({ error: e.message }); }
};