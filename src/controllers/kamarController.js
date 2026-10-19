const { Kamar } = require('../../models');

exports.getAllKamar = async (req, res) => {
    try { res.json(await Kamar.findAll()); }
    catch (e) { res.status(500).json({ error: e.message }); }
};

exports.createKamar = async (req, res) => {
    try { res.status(201).json(await Kamar.create(req.body)); }
    catch (e) { res.status(500).json({ error: e.message }); }
};

exports.updateKamar = async (req, res) => {
    try {
        const [n] = await Kamar.update(req.body, { where: { id: req.params.id } });
        if (!n) return res.status(404).json({ message: 'Kamar tidak ditemukan' });
        res.json({ message: 'Kamar diupdate' });
    } catch (e) { res.status(500).json({ error: e.message }); }
};