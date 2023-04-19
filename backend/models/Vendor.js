const mongoose = require("mongoose");

const VendorSchema = new mongoose.Schema({
    name: { type: String, required: true, },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    contactedUser: [{
        Name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        token: {
            type: String,
            required: true,
        },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Vendors",
            required: true,
        }
    }]
});

exports.VendorModel = mongoose.model("Vendors", VendorSchema);