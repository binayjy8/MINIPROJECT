const express = require("express");
const app = express();
const mongoose = require("mongoose");

const MONGO_URL = "mongodb://127.0.0.1:27017/bnb";

async function main() {
    await mongoose.connect(MONGO_URL);
};

app.listen(8080, () => {
    console.log("Listening to the port : 8080");
});