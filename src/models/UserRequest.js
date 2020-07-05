class UserRequest {
    constructor(body) {
        this.name = body.name;
        this.email = body.email;
        this.password = body.password;
        this.confirmPassword = body.confirmPassword;
    }
}

module.exports = UserRequest;