const { Reservasi, Tamu, Kamar, User, sequelize } = require('../../models');

exports.getAllReservasi = async (req, res) => {
    try {
        const data = await Reservasi.findAll({
            include: [
                { model: Tamu, attributes: ['nama', 'no_hp'] },
                { model: Kamar, attributes: ['nomor_kamar', 'tipe_kamar'] },
                { model: User, attributes: ['nama'] }
            ]
        });
        res.json(data);
    } catch (e) { res.status(500).json({ error: e.message }); }
};

exports.createReservasi = async (req, res) => {
    const { id_tamu, id_kamar, id_user, tanggal_masuk, tanggal_keluar } = req.body;
    const t = await sequelize.transaction();
    try {
        const r = await Reservasi.create({
            id_tamu, id_kamar, id_user, tanggal_masuk, tanggal_keluar, status_reservasi: 'Booked'
        }, { transaction: t });
        await Kamar.update({ status: 'Booked' }, { where: { id: id_kamar }, transaction: t });
        await t.commit();
        res.status(201).json(r);
    } catch (e) { await t.rollback(); res.status(500).json({ error: e.message }); }
};