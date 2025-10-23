const mongoose = require('mongoose');

const DeliverySchema = new mongoose.Schema(
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
        authorization: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Authorization',
            required: true
        },
        DeliveredIn: {
            type: Date,
            default: Date.now
        },
    },
    { timestamps: true });

DeliverySchema.index(
    {
        data: 1,
        student: 1
    },
    {
        unique: true
    }
);

module.exports = mongoose.model('Delivery', DeliverySchema);