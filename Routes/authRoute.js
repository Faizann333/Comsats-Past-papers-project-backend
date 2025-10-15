const express = require("express");
const authRouter = express.Router();
const { signupValidation , validate } = require("../midlewares/validationMiddleware");

const {
    postLoginController,
    postSignupController,
    postLogoutController,
    getMeController,} = require("../Controllers/authController");

authRouter.post("/signup",signupValidation,validate, postSignupController);
authRouter.post("/login", postLoginController);
authRouter.post("/logout", postLogoutController);
authRouter.get("/me", getMeController);

module.exports = authRouter;
