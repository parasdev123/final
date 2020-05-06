const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const emailSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email_address: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    error: {
        type: String
    }
});

module.exports = Email = mongoose.model('email', emailSchema);