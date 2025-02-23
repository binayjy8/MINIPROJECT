const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.listen(8080, () => {
    console.log("Listening to the port : 8080");
});