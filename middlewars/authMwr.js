const jwt = require('jsonwebtoken');
const {User} = require("../db/usersModel");
const JWT_SECRET = process.env.JWT_SECRET;


const authMwr = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(400).json({"message": "Please, provide a token"})
        }
        const [, token] = req.headers.authorization.split(' ');

        const tokenVerify = jwt.verify(token, JWT_SECRET);
        const tokenUser = tokenVerify.email;
        const dbUser = await User.findOne({email: tokenUser})

        if (!dbUser) {
            return res.status(401).json({"message": "Not authorized"})
        }
        if (dbUser.token !== token) {
            return res.status(401).json({"message": "Not authorized"})
        }

        req.user = tokenUser;
        req.token = token;
        req.subscription = dbUser.subscription;
        req.userId = dbUser._id;

    } catch (err) {
        return res.status(401).json({"message": "Not authorized"})
    }
    next();
}

module.exports = {
    authMwr: authMwr,
}
