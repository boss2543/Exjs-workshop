// const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        let token = req.headers.authorization
        // const decoded = jwt.verify(token, process.env.JWT_KEY);
        if (!token) return res.status(401).send("invalid token");
        req.auth = token;
        next();
    } catch (error) {
        res.status(500).send(error)
    }
}