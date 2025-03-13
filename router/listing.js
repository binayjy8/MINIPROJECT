const express= require("express");
const router = express.Router();


//Index Route
router.get(
    "/",  
    wrapAsync(async (req, res) => {
     const allListings = await Listing.find({});
     res.render("./listings/index.ejs", { allListings });
}));

//New Route
router.get("/new", (req, res) => {
    res.render("listings/new.ejs");
});

//Show Route
router.get(
    "/:id", 
    wrapAsync(async (req, res) => {
     let {id} = req.params;
     const listing = await Listing.findById(id).populate("reviews");
     res.render("./listings/show.ejs", { listing });
}));

//Create Route
router.post(
    "/", 
    validateListing,
    wrapAsync(async (req, res) => {
      const newListing = new Listing(req.body.listing);
      await newListing.save();
      res.redirect("/listings");
  }));

//Edit Route
router.get(
    "/listings/:id/edit", 
     wrapAsync(async (req, res) => {
     let {id} = req.params;
     const listing = await Listing.findById(id);
     res.render("./listings/edit.ejs", {listing});
}));

//Update Route
router.put(
    "/listings/:id", 
     validateListing,
     wrapAsync(async (req, res) => {
     let {id} = req.params;
     await Listing.findByIdAndUpdate(id, {...req.body.listing});
     res.redirect(`/listings/${id}`);
}));

//Delete Route
router.delete(
    "/listings/:id", 
    wrapAsync(async (req, res) => {
      let {id} = req.params;
      let deleteListing = await Listing.findByIdAndDelete(id);
      console.log(deleteListing);
      res.redirect("/listings");
}));

module.exports = router;