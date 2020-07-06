class ContactRequest {
    constructor(body, userId) {
        this._id = body._id;
        this.firstName = body.firstName;
        this.lastName = body.lastName;
        this.email = body.email;
        this.phoneNumber = body.phoneNumber;
        this.ownerId = userId;
    }
}

module.exports = ContactRequest;