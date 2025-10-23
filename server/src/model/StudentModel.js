const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    ra: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    photoUrl: {
        type: String,
        requeired: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Student', StudentSchema);