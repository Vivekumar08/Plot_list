import mongoose from "mongoose";

const VendorSchema = new mongoose.Schema({
    name: { type: String, required: true, },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    savedProduct: [{ type: mongoose.Schema.Types.ObjectId, ref: "Products" }],
});

export const VendorModel = mongoose.model("Vendors", VendorSchema);