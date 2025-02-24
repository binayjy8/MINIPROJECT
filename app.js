const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listings.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/bnb";

main()
    .then(() => {
        console.log("connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
};

app.get("/", (req, res) => {
    res.send("hi this is root");
});

app.get("/listings",  (req, res) => {
    Listing.find({}).then((res) => {
        console.log(res);
    })
})

app.listen(8080, () => {
    console.log("Listening to the port : 8080");
});