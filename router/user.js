const express= require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");

router.get("/signup", (req, res) => {
    res.render("users/signup.ejs");
});

router.post(
    "/signup", 
    wrapAsync(async(req, res) => {
        try {
            let { email, username, password } = req.body;
    const newUser = new User({ email, username });
    const registerdUser = await User.register(newUser, password);
    console.log(registerdUser);
    res.redirect("/listings");
        } catch (e) {
            req.flash("error", e.message);
            res.redirect("/signup");
        }
}));

router.get();

module.exports = router;