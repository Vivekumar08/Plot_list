const express = require("express");
const mongoose = require("mongoose");
const { ProductModel } = require("../models/Product.js");
const { VendorModel } = require("../models/Vendor.js");
const upload = require("../utils/storage.js");
const verifyToken = require("../utils/verifyToken.js");

const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
    try {
        const result = await ProductModel.find({});
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Create a new product
productRouter.post("/products",
    verifyToken,
    upload.single('file'),
    async (req, res) => {
        const { fullName, Bedroom, Bathroom, dimension, Prize } = req.body
        const { filename } = req.file
        console.log(filename)
        const user = await VendorModel.findById(req.user)
        const recipe = new ProductModel({
            _id: new mongoose.Types.ObjectId(),
            fullName,
            imageUrl: filename,
            ingredients: {
                Bedroom, Bathroom,
            },
            dimension: dimension,
            Prize,
            userOwner: user,
        });
        console.log(recipe);

        try {
            const result = await recipe.save();
            res.status(201).json({
                createdRecipe: {
                    name: result.name,
                    image: result.imageUrl,
                    ingredients: result.ingredients,
                    Distance: result.Distance,
                    Prize: result.Prize,
                    Reviews: result.Reviews,
                    _id: result._id,
                },
            });
        } catch (err) {
            res.status(500).json(err);
        }
    });

// Get a recipe by ID
productRouter.get("/:recipeId", async (req, res) => {
    try {
        const result = await ProductModel.findById(req.params.recipeId);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Save a Recipe
productRouter.put("/", async (req, res) => {
    const recipe = await ProductModel.findById(req.body.recipeID);
    const user = await VendorModel.findById(req.body.userID);
    try {
        user.savedProduct.push(recipe);
        await user.save();
        res.status(201).json({ savedProduct: user.savedProduct });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get id of saved recipes
productRouter.get("/savedProduct/ids/:userId", async (req, res) => {
    try {
        const user = await VendorModel.findById(req.params.userId);
        res.status(201).json({ savedProduct: user?.savedProduct });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Get saved recipes
productRouter.get("/savedProduct/:userId", async (req, res) => {
    try {
        const user = await VendorModel.findById(req.params.userId);
        const savedProduct = await ProductModel.find({
            _id: { $in: user.savedProduct },
        });

        console.log(savedProduct);
        res.status(201).json({ savedProduct });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = productRouter;