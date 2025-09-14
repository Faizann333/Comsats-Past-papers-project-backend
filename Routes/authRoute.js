const express = require("express");
const authRouter = express.Router();

const {
    postLoginController,
    postSignupController,
    postLogoutController,
    getMeController,} = require("../Controllers/authController");

authRouter.post("/signup", postSignupController);
authRouter.post("/login", postLoginController);
authRouter.post("/logout", postLogoutController);
authRouter.get("/me", getMeController);

module.exports = authRouter;
