const mongoose = require('mongoose');

const skillSchema = mongoose.Schema({
    skill: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('skill', skillSchema);