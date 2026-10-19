const { Tamu } = require('../../models');

exports.getAllTamu = async (req, res) => {
    try { res.json(await Tamu.findAll()); }
    catch (e) { res.status(500).json({ error: e.message }); }
};

exports.createTamu = async (req, res) => {
    try { res.status(201).json(await Tamu.create(req.body)); }
    catch (e) { res.status(500).json({ error: e.message }); }
};