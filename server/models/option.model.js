const mongoose = require('mongoose');

const OptionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [
            true,
            "Option is required"
        ],
        trim: true,
        minlength: [3, "Option must be at least 3 characters"]
    },

    votes: {
        type: Number,
        required: [
            true,
            "Votes are required"
        ],
        min: 0
    }
}, { timestamps: true });

module.exports.Option = mongoose.model('Option', OptionSchema);