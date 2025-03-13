const express= require("express");
const router = express.Router();

//Review Route
app.post(
    "/listings/:id/review", 
      validateReview, 
      wrapAsync(async (req, res) => {
        let listing = await Listing.findById(req.params.id);
        let newReview = new Review(req.body.review);

        listing.reviews.push(newReview);

        await listing.save();
        await newReview.save();

        res.redirect();
}));

//DElete Review Route
app.delete(
    "/listings/:id/reviews/:reviewId", 
    wrapAsync(async(req, res) => {
    let { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);

    res.redirect(`/listings/${id}`);
}));