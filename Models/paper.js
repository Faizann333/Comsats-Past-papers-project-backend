const mongoose = require("mongoose");

const paperSchema = new mongoose.Schema(
    {
        instructorName: {
            type: String,
            required: true,
        },
        examType: {
            type: String,
            required: true,
        },
        courseName: {
            type: String,
            required: true,
        },
        courseCode: {
            type: String,
            required: true,
        },
        semester: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending",
        },
        uploader: {
            type: String,
            required: true,
        },
        fileUrl: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("Paper", paperSchema);
