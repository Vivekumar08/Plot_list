const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    ingredients: [
        {
            Bathroom: {
                type: Number,
                required: true,
            },
            Bedroom: {
                type: Number,
                required: true,
            },
        },
    ],
    imageUrl: {
        type: String,
        required: true,
    },
    dimension: {
        type: Number,
        required: true,
    },
    Reviews: {
        type: Number,
        default: 0,
    },
    Prize: {
        type: Number,
        required: true,
    },
    userOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendors",
        required: true,
    },
});

exports.ProductModel = mongoose.model("Products", productSchema);