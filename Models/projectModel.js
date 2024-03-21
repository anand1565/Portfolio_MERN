const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    skills: {
        type: Array,
        default: [],
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    githubLink: {
        type: String,
        required: true
    },
    deploymentLink: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('projects', projectSchema);