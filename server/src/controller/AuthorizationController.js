// src/controller/AuthorizationController.js
const Authorization = require('../model/AuthorizationModel');

module.exports = {
    async create(req, res) {
        try {
            const { data, student, qtd } = req.body;
            const auth = await Authorization.create({
                data: new Date(data),
                student,
                qtd
            });
            res.status(201).json(auth);
        } catch (err) {
            if (err.code === 11000) {
                return res.status(400).json({ errors: ['There\'s already an authorization for this student on this date'] });
            }
            res.status(500).json({ errors: ['Error creating authorization'] });
        }
    },

    // Listar autorizações (com filtro opcional por data)
    async list(req, res) {
        try {
            const { data } = req.query;
            const filter = {};
            if (data) {
                const d = new Date(data);
                const start = new Date(d.setHours(0, 0, 0, 0));
                const end = new Date(d.setHours(23, 59, 59, 999));
                filter.data = { $gte: start, $lte: end };
            }
            const list = await Authorization.find(filter).populate('student');
            res.json(list);
        } catch {
            res.status(500).json({ errors: ['Error listing authorizations'] });
        }
    },

    // Atualizar autorização
    async update(req, res) {
        try {
            const { id } = req.params;
            const { data, student, qtd } = req.body;
            const updated = await Authorization.findByIdAndUpdate(
                id,
                { data: new Date(data), student, qtd },
                { new: true }
            );
            if (!updated) return res.status(404).json({ errors: ['Authorization not found'] });
            res.json(updated);
        } catch (err) {
            if (err.code === 11000) {
                return res.status(400).json({ errors: ['There\'s already an authorization for this student on this date'] });
            }
            res.status(500).json({ errors: ['Error updating authorization'] });
        }
    },

    // Remove authorization
    async remove(req, res) {
        try {
            const { id } = req.params;
            const deleted = await Authorization.findByIdAndDelete(id);
            if (!deleted) return res.status(404).json({ errors: ['Authorization not found'] });
            res.status(204).send();
        } catch {
            res.status(500).json({ errors: ['Error deleting authorization'] });
        }
    }
};