import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();
import { VendorModel } from "../models/Vendor.js";

router.post("/register", async (req, res) => {
    const { name, username, password } = req.body;
    const user = await VendorModel.findOne({ username });
    if (user) {
        return res.status(400).json({ message: "Username already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new VendorModel({ name, username, password: hashedPassword });
    await newUser.save();
    res.json({ message: "User registered successfully" });
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await VendorModel.findOne({ username });

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

export { router as userRouter };

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const decode = jwt.verify(authHeader, "secret")
        if (decode) {
            console.log(decode)
            req.user = decode.id
            next();
        } else {
            res.sendStatus(402).json({ err: "not able to decode" });
        }
    } else {
        res.sendStatus(401);
    }
};