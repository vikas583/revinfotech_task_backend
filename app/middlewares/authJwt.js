const jwt = require("jsonwebtoken");
const config = require("../config/index");
const db = require('../database/models')
const userModel = db.usersModel

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    jwt.verify(token, config.APP_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.userId = decoded.id;
        // console.log(token)
        userModel.findOne({
            $and: [
                { _id: req.userId },
                { access_token: token }
            ]
        }).then(user => {
            if (user != null) {
                next()
            }
            else {
                return res.status(401).send({
                    message: "Token invalid"
                });
            }
        })


    });
};

const authJwt = {
    verifyToken: verifyToken
};
module.exports = authJwt;