import express from "express";
import mongoose from "mongoose";
import { ProductModel } from "../models/Product.js";
import { VendorModel } from "../models/Vendor.js";
import { upload } from "../utils/storage.js";
import { verifyToken } from "./user.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const result = await ProductModel.find({});
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Create a new recipe
router.post("/", upload.single('file'), verifyToken, async (req, res) => {

    const { fullName, ingredients, Details, Reviews, Prize, userOwner, } = req.body
    const { filename } = req.file
    const recipe = new ProductModel({
        _id: new mongoose.Types.ObjectId(),
        fullName,
        imageUrl: filename,
        ingredients,
        Details,
        Reviews,
        Prize,
        userOwner,
    });
    console.log(recipe);

    try {
        const result = await recipe.save();
        res.status(201).json({
            createdRecipe: {
                name: result.name,
                image: result.image,
                ingredients: result.ingredients,
                Details: result.Details,
                Prize: result.Prize,
                Reviews: result.Reviews,
                _id: result._id,
            },
        });
    } catch (err) {
        // console.log(err);
        res.status(500).json(err);
    }
});

// Get a recipe by ID
router.get("/:recipeId", async (req, res) => {
    try {
        const result = await ProductModel.findById(req.params.recipeId);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Save a Recipe
router.put("/", async (req, res) => {
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
router.get("/savedProduct/ids/:userId", async (req, res) => {
    try {
        const user = await VendorModel.findById(req.params.userId);
        res.status(201).json({ savedProduct: user?.savedProduct });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Get saved recipes
router.get("/savedProduct/:userId", async (req, res) => {
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

export { router as productRouter };