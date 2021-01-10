const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const tokenUnsplited = req.headers.authorization;
        if (!tokenUnsplited) {
            throw "error";
        } else {
            const token = req.headers.authorization.split(' ')[1];
            var decoded = jwt.verify(token, process.env.PRIVATE_KEY);
            if (decoded.id == req.params.id) {
                next();
            } else {
                throw "error";
            }
        }
    } catch (err) {
        let response = {
            "message": "failed",
            "description": "You don't have permissions!"
        };
        res.status(401).json(response);
    }
}