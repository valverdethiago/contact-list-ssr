const express = require('express');
const route = express.Router();
const homeController = require('./controllers/HomeController');
const loginController = require('./controllers/LoginController');
const registerController = require('./controllers/RegisterController');

route.get('/', homeController.index);
route.get('/login', loginController.index);
route.post('/login', loginController.login);
route.get('/logout', loginController.logout);
route.get('/register', registerController.index)
route.post("/register", registerController.register)

module.exports = route;
