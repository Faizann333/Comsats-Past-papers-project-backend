const User = require("../Models/user");
const Paper = require('../Models/paper')
const Review = require('../Models/review');

exports.getAdminPapersController = async (req, res) => {
    try{
        const papers = await Paper.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            message: "Papers fetched successfully",
            data: papers,
        });
    }   
    catch(err){
        console.error("Error getting papers:", err);
        res.status(500).json({
            message: "Internal server error",
            error: err.message,
        });
    }
}

exports.getAdminReviewsController = async (req, res) => {

    try{
        const reviews = await Review.find().sort({ createdAt: -1 });
      
        res.status(200).json({
            success: true,
            message: "Reviews fetched successfully",
            data: reviews
        });
    }
    catch(err){
        console.error("Error getting reviews:", err);
        res.status(500).json({
            message: "Internal server error",
            error: err.message,
        });
    }
}

exports.getAdminUsersController = async (req, res) => {

    try{
        const users = await User.find().sort({ createdAt: -1 });
      
        res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data: users,
        });
    }
    catch(err){
        console.error("Error getting reviews:", err);
        res.status(500).json({
            message: "Internal server error",
            error: err.message,
        });
    }
}