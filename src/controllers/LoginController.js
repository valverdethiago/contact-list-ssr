const LoginRequest = require('../models/LoginRequest');
const UserService = require('../services/UserService');

const userService = new UserService();

exports.index = (req, res) => {
    res.render('login');
}
exports.logout = (req, res) => {
    req.session.user = null;
    req.flash('success', `User successfully logged out. See ya.`);
    return res.redirect('/');
}

exports.login = async function(req, res) {
    const request = new LoginRequest(req.body);
    try {
        const user = await userService.login(request);
        req.flash('success', `User ${user.name} logged in successfully.`);
        req.session.user = user;
        req.session.save(function() {
            return res.redirect('/');
        });
    }
    catch(e) {
        console.log(e);
        req.flash('errors', e.errors);
        req.session.save(function () {
            return res.redirect('back');
        });
    }
}