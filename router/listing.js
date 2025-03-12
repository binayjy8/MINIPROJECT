const express= require("express");
const router = express.Router();


//Index Route
router.get(
    "/listings",  
    wrapAsync(async (req, res) => {
     const allListings = await Listing.find({});
     res.render("./listings/index.ejs", { allListings });
}));

//New Route
router.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
});

//Show Route
router.get(
    "/listings/:id", 
    wrapAsync(async (req, res) => {
     let {id} = req.params;
     const listing = await Listing.findById(id).populate("reviews");
     res.render("./listings/show.ejs", { listing });
}));

//Create Route
app.post(
    "/listings", 
    validateListing,
    wrapAsync(async (req, res) => {
      const newListing = new Listing(req.body.listing);
      await newListing.save();
      res.redirect("/listings");
  }));

  //Edit Route
app.get(
    "/listings/:id/edit", 
     wrapAsync(async (req, res) => {
     let {id} = req.params;
     const listing = await Listing.findById(id);
     res.render("./listings/edit.ejs", {listing});
}));

//Update Route
app.put(
    "/listings/:id", 
     validateListing,
     wrapAsync(async (req, res) => {
     let {id} = req.params;
     await Listing.findByIdAndUpdate(id, {...req.body.listing});
     res.redirect(`/listings/${id}`);
}));

module.exports = router;