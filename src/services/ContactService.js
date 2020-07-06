const ContactModel = require('../models/ContactModel');
const Contact = require('../models/Contact');
const ValidationException = require('../exceptions/ValidationException');

class ContactService{
    constructor() {       
    }

    async findAllByUser(userId) {
        return await ContactModel.find({ownerId : userId});
    }

    async save(contactRequest) {
        const contact = this.validateContactRequest(contactRequest);  
        await this.isContactAlreadyExistent(contact);
        if(contact._id) {
            return await ContactModel.update(contact);
        }
        return await ContactModel.create(contact);
    }

    async delete(contactId) {
        await ContactModel.findByIdAndDelete(contactId);
    }

    async findById(id, userId) {
        const dbContact = await ContactModel.findById(id);
        if(dbContact && dbContact.ownerId == userId) {
            return dbContact;
        }
    }

    async isContactAlreadyExistent(contact) {
        const dbContact = await ContactModel.findOne( { $and : 
            [
                { ownerId : contact.ownerId }, 
                {
                    $or : [
                        { $and : [{firstName : contact.firstName}, {lastName : contact.lastName}] },
                        { email : contact.email},
                        { phoneNumber : contact.phoneNumber}
                    ]
                }
            ]                    
        });
        if(dbContact) {
            throw new ValidationException(["There's already a contact with this information in your contact list"]);
        }

    }

    validateContactRequest(contactRequest) {
        const validationErrors = [];
        if(!contactRequest.firstName || contactRequest.firstName.trim().length < 3 || contactRequest.firstName.trim().length > 50) {
            validationErrors.push('First mame must be valid with size between 3 and 50.');
        }
        if(contactRequest.lastName && ( contactRequest.lastName.trim().length < 3 || contactRequest.lastName.trim().length > 50)) {
            validationErrors.push('Last name must be valid with size between 3 and 50.');
        }
        if(!contactRequest.email && !validator.isEmail(contactRequest.email.trim())) {
            validationErrors.push(`${contactRequest.email} is invalid email`);
        }
        if(!contactRequest.phoneNumber && !validator.isMobilePhone(contactRequest.phoneNumber)) {
            validationErrors.push(`${contactRequest.phoneNumber} is not valid `);
        }
        if(validationErrors.length > 0) {
            throw new ValidationException(validationErrors);
        }
        return new Contact(contactRequest._id, 
            contactRequest.firstName, 
            contactRequest.lastName, 
            contactRequest.email, 
            contactRequest.phoneNumber, 
            contactRequest.ownerId );

    }

}

module.exports = ContactService;