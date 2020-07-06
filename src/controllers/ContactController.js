const ContactService = require('../services/ContactService');
const ContactRequest = require('../models/ContactRequest');

const contactService = new ContactService();

exports.index = async function(req, res) {
    const userLoggedIn = req.session.user;
    const contactList = await contactService.findAllByUser(userLoggedIn._id);
    res.render('contacts', { contactList : contactList });
};

exports.newContact = (req, res) => {
    const userLoggedIn = req.session.user;
    res.render('contact', {
        contact: {}
    })
};

exports.save = async function (req, res) {
    const userLoggedIn = req.session.user;
    const contactRequest = new ContactRequest(req.body, userLoggedIn._id);
    try {
        const contactDb = await contactService.save(contactRequest);    
        req.flash('success', `Contact saved successfully. `);
        req.session.save(function() {
            return res.redirect('/contacts');
        });
    }
    catch (e) {
        console.log(e);
        req.flash('errors', e.errors);
        req.session.save(function () {
            return res.redirect('back');
        });
    }
};

exports.detail = async function(req, res) {
    const userLoggedIn = req.session.user;
    const id = req.params.id;
    if(!id) {
        req.flash('errors', ['You must specify which contact you would like to edit']);
        req.session.save(function () {
            return res.redirect('back');
        });
        return;
    }
    const contact = await contactService.findById(id, userLoggedIn._id);
    if(!contact) {        
        req.flash('errors', ["There's no such contact in your agenda"]);
        req.session.save(function () {
            return res.redirect('back');
        });
        return;
    }
    res.render('contact', {
        contact: contact
    })
};