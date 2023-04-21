const express = require("express");
const mongoose = require("mongoose");
const { ProductModel } = require("../models/Product.js");
const { VendorModel } = require("../models/Vendor.js");
const upload = require("../utils/storage.js");
const verifyToken = require("../utils/verifyToken.js");
const deleteFile = require("../utils/fileDelete.js");
const { generateRandomToken } = require("../utils/basicFunction..js");

const clientRouter = express.Router();

clientRouter.post("/clientInfo/:productid", async (req, res) => {
    try {
        const { Name, email, message } = req.body;
        const productId = req.params.productid
        const product = await ProductModel.findById(productId)
        const token = generateRandomToken()
        await VendorModel.findOneAndUpdate(
            { _id: product.userOwner },
            {
                $push: {
                    contactedUser: {
                        Name: Name, email: email, message: message, token: token, category: product.Category, productId: productId
                    }
                }
            }
        )
        res.status(200).json({ msg: "Successfully Message Sent", token: token })
    } catch (error) {
        console.log(error)
        res.status(500).json({ err: error })
    }
})

clientRouter.get("/clientInfo", verifyToken, async (req, res) => {
    try {
        const user = await VendorModel.findById(req.user, { contactedUser: 1, name: 1 })
        const product = await ProductModel.find({ userOwner: user._id })
        res.status(200).json({ contactedUser: user.contactedUser, name: user.name, product: product })
    } catch (error) {
        res.status(500).json({ err: error })
    }
})

clientRouter.get("/productdetails/:id", verifyToken, async (req, res) => {
    try {
        const user = await VendorModel.findById(req.user)
        if (user) {
            const product = await ProductModel.findById(req.params.id)
            console.log(product)
            res.status(200).json(product)
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ err: error })
    }
})

module.exports = clientRouter;
