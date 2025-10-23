const mongoose = require('mongoose');

const AuthorizationSchema = new mongoose.Schema(
    {
        data: {
            type: Date,
            required: true
        },
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
            required: true
        },
        qtd: {
            type: Number,
            required: true,
            min: 1,
            max: 3
        },
    },
    { timestamps: true });

AuthorizationSchema.index(
    {
        data: 1,
        student: 1
    },
    {
        unique: true
    });

module.exports = mongoose.model('Authorization', AuthorizationSchema);