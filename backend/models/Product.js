const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    ingredients: [
        {
            type: String,
            required: true,
        },
    ],
    imageUrl: {
        type: String,
        required: true,
    },
    Distance: {
        type: Number,
        required: true,
    },
    Reviews: {
        type: Number,
        default:0,
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