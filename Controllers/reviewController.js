const Review = require("../Models/review");

exports.postReviewController = async (req, res) => {
    try {
        const { instructorName, courseName, review , uploaderName,uploaderReg} = req.body;

        const reviewData = new Review({
            instructorName,
            courseName,
            review,
            uploaderName,
            uploaderReg
        });

        const savedReview = await reviewData.save();

        res.status(201).json({
            success: true,
            message: "Review posted successfully",
            data: savedReview,
        });
    } catch (error) {
        console.error("Error saving review:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

exports.getReviewController = async (req, res) => {

    try{
        const reviews = await Review.find().sort({ createdAt: -1 });
      
        res.status(200).json({
            success: true,
            message: "Reviews fetched successfully",
            data: reviews,
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
