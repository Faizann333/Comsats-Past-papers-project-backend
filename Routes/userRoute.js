const express = require("express");
const {authMiddleware} = require("../midlewares/authMiddleware");
//local modules
const  {postReviewController,getReviewController} = require("../Controllers/reviewController");
const {postPaperController,getPapersController,postFileController} = require("../Controllers/paperController");

const userRouter = express.Router();


userRouter.post("/reviews",authMiddleware,postReviewController);
userRouter.get("/reviews",authMiddleware,getReviewController);
userRouter.post("/papers",authMiddleware,postPaperController);
userRouter.get("/papers",getPapersController);
userRouter.post("/FileUpload",postFileController);

module.exports = userRouter; 
