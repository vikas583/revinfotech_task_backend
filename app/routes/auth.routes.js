const authController = require("../controllers/auth.controller");
const authJwt = require("../middlewares/authJwt");
// const validator = require("../middlewares/validator")

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/auth/signup", authController.signUp)

    app.post("/api/auth/signin", authController.signIn);

    app.get("/api/user/details", [authJwt.verifyToken], authController.userDetails)

}