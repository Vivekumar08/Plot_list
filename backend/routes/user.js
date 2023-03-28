const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userRouter = express.Router();
const { VendorModel } = require("../models/Vendor.js");

userRouter.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log(name, email, password)
        const user = await VendorModel.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "Username already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new VendorModel({ name, email, password: hashedPassword });
        await newUser.save();
        res.json({ message: "User registered successfully" });
    } catch (err) {
        console.log(err)
    }
});

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password)
    const user = await VendorModel.findOne({ email });

    if (!user) {
        return res
            .status(400)
            .json({ message: "Username or password is incorrect" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res
            .status(400)
            .json({ message: "Username or password is incorrect" });
    }
    const token = jwt.sign({ id: user._id }, "secret");
    res.json({ token, userID: user._id });
});

module.exports = userRouter;