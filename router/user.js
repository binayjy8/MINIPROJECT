const express= require("express");
const router = express.Router();
const User = require("../models/user.js");

router.get("/signup", (req, res) => {
    res.render("users/signup.ejs");
});

router.post("/signup", async(req, res) => {
    let { email, username, password } = req.body;
    const newUser = new User(username, password);
    const registerdUser = await User.register(newUser, password);
});

module.exports = router;