const express = require('express')
const   {authMiddleware} = require('../midlewares/authMiddleware')
const {getAdminPapersController  , getAdminUsersController,getAdminReviewsController} = require('../Controllers/adminController')
const adminRouter = express.Router();


adminRouter.get('/papers',authMiddleware,getAdminPapersController);
adminRouter.get('/reviews',authMiddleware,getAdminReviewsController);
adminRouter.get('/users',authMiddleware,getAdminUsersController);

module.exports = adminRouter;





