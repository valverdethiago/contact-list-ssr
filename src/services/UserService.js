const validator = require('validator');
const ValidationException = require('../exceptions/ValidationException');
const User = require('../models/User');
const UserModel = require('../models/UserModel');
const bcrypt = require('bcryptjs');

class UserService {
    constructor(){        
    }

    async register(userRequest) {
        this.cleanUp(userRequest);
        const user = this.validateUserRequest(userRequest);  
        await this.isUserAlreadyExistent(user.email);    
        this.encodePassword(user);
        const dbUser = await UserModel.create(user);
        return dbUser;
    }

    async login(loginRequest) {
        this.cleanUp(loginRequest);
        const dbUser = await this.findUserByEmail(loginRequest.email);
        if(!dbUser || !bcrypt.compareSync(loginRequest.password, dbUser.password)) {
            throw new ValidationException(['Invalid username or password ']);
        }
        return dbUser;
    }

    async isUserAlreadyExistent(email) {
        let dbUser = await this.findUserByEmail(email);
        if (dbUser) {
            throw new ValidationException([`${email} is already registered.`]);
        }
        return dbUser;
    }

    encodePassword(user) {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
    }

    cleanUp(request) {
        for(const key in request) {
            if( typeof request[key] !== 'string') {
                request[key] = '';
            }
        }
    }

    validateUserRequest(userRequest) {
        const validationErrors = [];
        if(!userRequest.name || userRequest.name.trim().length < 10 || userRequest.name.trim().length > 50) {
            validationErrors.push('Name must be valid with size between 10 and 50.');
        }
        if(!validator.isEmail(userRequest.email.trim())) {
            validationErrors.push(`${userRequest.email} is invalid email`);
        }
        if(!userRequest.password || userRequest.password.trim().length < 6 || userRequest.password.trim().length > 12) {
            validationErrors.push('Password must be valid with size between 6 and 12.');
        }
        if(userRequest.password.trim().localeCompare(userRequest.confirmPassword.trim()) != 0) {
            validationErrors.push('Passwords does not match');
        }
        if(validationErrors.length > 0) {
            throw new ValidationException(validationErrors);
        }
        return new User(null, userRequest.name, userRequest.email, userRequest.password);
    }

    async findUserByEmail(email) {
        return UserModel.findOne({'email' : email});
    }
}

module.exports = UserService;