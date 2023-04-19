const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        // const authHeader = req.headers.authorization.split(" ")[1];
        if (authHeader) {
            const decode = jwt.verify(authHeader, "secret")
            if (decode) {
                req.user = decode.id
                next();
            } else {
                res.sendStatus(402).json({ err: "not able to decode" });
            }
        } else {
            res.sendStatus(401);
        }
    } catch (error) {
        console.log(error)
    }
};
module.exports = verifyToken