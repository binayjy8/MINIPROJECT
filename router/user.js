const express= require("express");
const router = express.Router();
const User = require("../models/user.js");

router.get("/signup", (req, res) => {
    res.render("users/signup.ejs");
});

router.post("/signup", (req, res) => {
    let { email, username, password } = req.body;
})

module.exports = router;