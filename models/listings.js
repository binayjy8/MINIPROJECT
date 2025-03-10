const { ref } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema ({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: "https://www.pexels.com/photo/flock-of-birds-in-flight-against-clear-sky-30810205/",
        set: (v) => v === "" ? "https://www.pexels.com/photo/flock-of-birds-in-flight-against-clear-sky-30810205/"
           : v,
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ]
});

listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({})
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;