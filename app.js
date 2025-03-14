const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/expressError.js");
const session = require("express-sessions");

const listings = require("./router/listing.js");
const reviews = require("./router/review.js");

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

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const sessionOptions = {
    secret: "secretcode",
    resave: false,
}

app.get("/", (req, res) => {
    res.send("hi this is root.");
});

app.use("/listings", listings);
app.use("/listings/:id/review", reviews);


app.all("*", (req, res, next) => {
    next(new ExpressError(404, "This page is not found!"));
});

app.use((err, req, res, next) => {
    let { statusCode=500, message="Something went wrong"} = err;
    res.status(statusCode).render("error.ejs", { message });
});

app.listen(8080, () => {
    console.log("Listening to the port : 8080");
});