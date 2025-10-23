const Student = require('../model/StudentModel');

module.exports = {
    async create(req, res) {
        try {
            const { ra, name } = req.body;
            if (!req.file) return res.status(400).json({ errors: ['Photo is mandatory'] });

            const exists = await Student.findOne({ ra });
            if (exists) return res.status(400).json({ errors: ['RA already registered'] });

            const student = await Student.create({
                ra,
                name,
                photoUrl: `/uploads/${req.file.filename}`
            });

            res.status(201).json(student);
        } catch (err) {
            res.status(500).json({ errors: ['Error creating student'] });
        }
    },

    async list(req, res) {
        const students = await Student.find().sort({ name: 1 });
        res.json(students);
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const { ra, name } = req.body;
            const update = { ra, name };
            if (req.file) update.photoUrl = `/uploads/${req.file.filename}`;

            const student = await Student.findByIdAndUpdate(id, update, { new: true });
            if (!student) return res.status(404).json({ errors: ['Student not found'] });

            res.json(student);
        } catch {
            res.status(500).json({ errors: ['Error updating student'] });
        }
    },

    async remove(req, res) {
        try {
            const del = await Student.findByIdAndDelete(req.params.id);
            if (!del) return res.status(404).json({ errors: ['Student not found'] });
            res.status(204).send();
        } catch {
            res.status(500).json({ errors: ['Error deleting student'] });
        }
    }
};