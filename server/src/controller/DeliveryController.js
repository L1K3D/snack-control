// src/controller/DeliveryController.js
const Delivery = require('../model/DeliveryModel');
const Authorization = require('../model/AuthorizationModel');

module.exports = {
    // Listar autorizações de uma data para entregar
    async listAuthorized(req, res) {
        try {
            const { data } = req.query;
            if (!data) return res.status(400).json({ errors: ['Date is required'] });

            const d = new Date(data);
            const start = new Date(d.setHours(0, 0, 0, 0));
            const end = new Date(d.setHours(23, 59, 59, 999));

            const list = await Authorization.find({ data: { $gte: start, $lte: end } }).populate('student');
            res.json(list);
        } catch {
            res.status(500).json({ errors: ['Error listing authorizations for delivery'] });
        }
    },

    // Register delivery
    async deliver(req, res) {
        try {
            const { authorizationId, data } = req.body;
            const auth = await Authorization.findById(authorizationId).populate('student');
            if (!auth) return res.status(404).json({ errors: ['Authorization not found'] });

            const delivery = await Delivery.create({
                data: new Date(data),
                student: auth.student._id,
                authorization: auth._id
            });

            res.status(201).json(delivery);
        } catch (err) {
            if (err.code === 11000) {
                return res.status(400).json({ errors: ['There\'s already a delivery registered for this student on this date'] });
            }
            res.status(500).json({ errors: ['Error registering delivery'] });
        }
    },

    // List deliveries (with optional date filter)
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

            const list = await Delivery.find(filter)
                .populate('aluno')
                .populate('authorization');

            const formatted = list.map(item => ({
                data: item.data,
                student: {
                    id: item.student._id,
                    name: item.student.name,
                    ra: item.student.ra,
                    photoUrl: item.student.photoUrl
                },
                authorization: {
                    id: item.authorization._id,
                    qtd: item.authorization.qtd
                },
                deliveredIn: item.deliveredIn
            }));

            res.json(formatted);
        } catch {
            res.status(500).json({ errors: ['Error listing deliveries'] });
        }
    }
};