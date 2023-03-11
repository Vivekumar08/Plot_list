import mongoose from "mongoose";

const recipeSchema = mongoose.Schema({
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
    Details: {
        type: Number,
        required: true,
    },
    Reviews: {
        type: Number,
        required: true,
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

export const ProductModel = mongoose.model("Products", recipeSchema);