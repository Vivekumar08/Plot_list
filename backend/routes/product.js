const express = require("express");
const mongoose = require("mongoose");
const { ProductModel } = require("../models/Product.js");
const { VendorModel } = require("../models/Vendor.js");
const upload = require("../utils/storage.js");
const verifyToken = require("../utils/verifyToken.js");
const deleteFile = require("../utils/fileDelete.js");

const productRouter = express.Router();


let bucket;
mongoose.connection.on("connected", () => {
    var db = mongoose.connections[0].db;
    bucket = new mongoose.mongo.GridFSBucket(db, {
        bucketName: "newBucket"
    });
});

productRouter.get("/fileinfo/:filename", (req, res) => {
    const file = bucket
        .find({
            filename: req.params.filename
        })
        .toArray((err, files) => {
            if (!files || files.length === 0) {
                return res.status(404)
                    .json({
                        err: "no files exist"
                    });
            }
            bucket.openDownloadStreamByName(req.params.filename)
                .pipe(res);
        });
});

productRouter.get("/", async (req, res) => {
    try {
        const result = await ProductModel.find({});
        const arr = []
        for (const user of result) {
            const owner = await VendorModel.findById(user.userOwner)
            arr.push({ result: user, name: owner.name, email: owner.email })
        }
        res.status(200).json([... new Set(arr)]);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Create a new product
productRouter.post("/products",
    verifyToken,
    upload.single('file'),
    async (req, res) => {
        const { fullName, Bedroom, Bathroom, dimension, Prize, Category } = req.body
        const { filename } = req.file
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
            Category: Category,
        });
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
                    Category: result.Category,
                    _id: result._id,
                },
            });
        } catch (err) {
            res.status(500).json(err);
            deleteFile(filename)

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

productRouter.delete("/:id", verifyToken, async (req, res) => {
    const prodId = req.params.id;
    const user = await VendorModel.findById(req.body.userID);
    try {
        if (user) {
            const recipe = await ProductModel.findById(prodId);
            deleteFile(recipe.imageUrl)
            recipe.deleteOne({ _id: prodId })
        } else {
            res.status(400).json("Owner not found")
        }
    } catch (error) {
        res.status(500).json({ err: "Internal Server Error" })
    }
})

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