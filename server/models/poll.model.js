const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { Option } = require('./option.model');

const PollSchema = new mongoose.Schema({
    question: { 
        type: String,
        required: [
            true,
            "Question is required"
        ],
        unique: true,
        trim: true,
        minlength: [10, "Question must be at least 3 characters"]
    },

    options: {
        type: [{
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
        }],
        required: [
            true,
            "Options are required"
        ],
        validate: {
            validator: val => validateOptionsArray(val),
            message: "You need to have 2 - 4 options"
        }
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

PollSchema.plugin(uniqueValidator);

function validateOptionsArray(arr){
    console.log(`Array length i: ${arr.length}`);
    return arr.length >= 2  && arr.length <= 4;
}

module.exports.Poll = mongoose.model('Poll', PollSchema);