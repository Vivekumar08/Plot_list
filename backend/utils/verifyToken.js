const verifyToken = (req, res, next) => {
    // const authHeader = req.headers.authorization;
    const authHeader = req.headers.authorization.split(" ")[1];
    console.log(authHeader)
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
module.exports = verifyToken