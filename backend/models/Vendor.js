const mongoose = require("mongoose");

const VendorSchema = new mongoose.Schema({
    name: { type: String, required: true, },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    savedProduct: [{ type: mongoose.Schema.Types.ObjectId, ref: "Products" }],
});

exports.VendorModel = mongoose.model("Vendors", VendorSchema);