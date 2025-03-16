const express= require("express");
const router = express.Router();
const User = 

router.get("/signup", (req, res) => {
    res.render("users/signup.ejs");
});

module.exports = router;