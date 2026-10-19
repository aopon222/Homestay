const { CheckinOut, Reservasi, Kamar, sequelize } = require('../../models');

exports.checkIn = async (req, res) => {
    const { id_reservasi, catatan, dicatat_oleh } = req.body;
    try {
        const c = await CheckinOut.create({
            id_reservasi, waktu_checkin: new Date(), catatan, dicatat_oleh
        });
        await Reservasi.update({ status_reservasi: 'Checked In' }, { where: { id: id_reservasi } });
        res.status(201).json(c);
    } catch (e) { res.status(500).json({ error: e.message }); }
};

exports.checkOut = async (req, res) => {
    const { id_checkin_out, id_reservasi, id_kamar } = req.body;
    const t = await sequelize.transaction();
    try {
        await CheckinOut.update({ waktu_checkout: new Date() }, { where: { id: id_checkin_out }, transaction: t });
        await Reservasi.update({ status_reservasi: 'Completed' }, { where: { id: id_reservasi }, transaction: t });
        await Kamar.update({ status: 'Tersedia' }, { where: { id: id_kamar }, transaction: t });
        await t.commit();
        res.json({ message: 'Check-out berhasil' });
    } catch (e) { await t.rollback(); res.status(500).json({ error: e.message }); }
};