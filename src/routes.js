const express = require('express');
const route = express.Router();
const homeController = require('./controllers/HomeController');
const loginController = require('./controllers/LoginController');
const registerController = require('./controllers/RegisterController');
const contactController = require('./controllers/ContactController');
const {userLoggedInMiddleware} = require('./middleware/middleware');

route.get('/', homeController.index);
route.get('/login', loginController.index);
route.post('/login', loginController.login);
route.get('/register', registerController.index);
route.post('/register', registerController.register);
route.get('/logout', userLoggedInMiddleware, loginController.logout);
route.get('/contacts', userLoggedInMiddleware,contactController.index);
route.get('/contact/new', userLoggedInMiddleware, contactController.newContact);
route.post('/contact', userLoggedInMiddleware, contactController.save );
route.get('/contact/:id', userLoggedInMiddleware, contactController.detail);

module.exports = route;
