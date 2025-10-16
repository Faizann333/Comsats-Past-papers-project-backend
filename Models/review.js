const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
    {
        instructorName: {
            type: String,
            required: true,
        },
        courseName: {
            type: String,
            required: true,
        },
        review: {
            type: String,
            required: true,
        },
        uploaderName: {
            type: String,
            required: true,
        },
          uploaderReg: {
            type: String,
            required: true,
        },
           status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending",
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("Review", reviewSchema);
