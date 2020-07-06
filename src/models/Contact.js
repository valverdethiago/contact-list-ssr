class Contact {
    constructor(_id, firstName, lastName, email, phoneNumber, ownerId) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.ownerId = ownerId;
    }
}
module.exports = Contact;
