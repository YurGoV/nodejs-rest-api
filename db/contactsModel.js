const mongoose = require('mongoose');
const {SchemaTypes} = require("mongoose");


const contactsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    owner: {
        type: SchemaTypes.ObjectId,
        ref: 'users',
    },
});


const Contacts = mongoose.model('Contact', contactsSchema);

module.exports = {
    Contacts
};