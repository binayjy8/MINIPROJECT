const express= require("express");
const router = express.Router();


//Index Route
app.get(
    "/listings",  
    wrapAsync(async (req, res) => {
     const allListings = await Listing.find({});
     res.render("./listings/index.ejs", {allListings});
}));

//New Route
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
});

//Show Route
app.get(
    "/listings/:id", 
    wrapAsync(async (req, res) => {
     let {id} = req.params;
     const listing = await Listing.findById(id).populate("reviews");
     res.render("./listings/show.ejs", { listing});
}));