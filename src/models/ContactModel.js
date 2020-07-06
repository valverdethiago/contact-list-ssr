const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;

const ContactSchema = new mongoose.Schema({
    firstName: { type : String, required: true },
    lastName: { type : String, required: false },
    email: { type : String, required: false },
    phoneNumber: { type : String, required: false },
    createdAt: { type : String, required: false, default : Date.now },
    updatedAt: { type : String, required: false, default : Date.now },
    ownerId: { type: ObjectId, required : true }
});

const ContactModel = mongoose.model('Contact', ContactSchema);

module.exports = ContactModel;

