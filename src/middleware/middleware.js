exports.globalMiddleware = (req, res, next) => {
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    res.locals.user = req.session.user;
    next();
  };

exports.userLoggedInMiddleware = (req, res, next) => {
  if(!req.session.user) {
    req.flash('errors', ['Ops... You must be logged in to access this resource.']);
    req.session.save(function() {
        return res.render('login');
    });
    return;
  }
  next();
}