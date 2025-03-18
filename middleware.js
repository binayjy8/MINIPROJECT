module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        req
        req.flash("error", "you must be logged in");
        return res.redirect("/login");
    }
    next();
};