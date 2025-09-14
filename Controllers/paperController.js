const Paper = require('../Models/paper')

exports.postPaperController = async (req, res) => {
    try {
        const { instructorName,examType, courseName,courseCode, semester , uploader } = req.body;
        console.log(instructorName,examType, courseName,courseCode, semester , uploader)
        const paperData = new Paper({
            instructorName,
            examType,
            courseName,
            courseCode,
            semester,
            uploader
    })

    const savedPaper=  await paperData.save();

    res.status(201).json({
        success: true,
        message: "Paper posted successfully",
        data:savedPaper
    })
}
    catch(err) {   
        console.error("Error saving paper:", err);
        res.status(500).json({
            message: "Internal server error",
            error: err.message,
        });
    }
}

exports.getPapersController = async (req, res) => {
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