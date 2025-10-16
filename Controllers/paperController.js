const Paper = require('../Models/paper')

exports.postPaperController = async (req, res) => {
    try {
        const { instructorName,examType, courseName,courseCode, semester , uploader , fileUrl } = req.body;
      
        const paperData = new Paper({
            instructorName,
            examType,
            courseName,
            courseCode,
            semester,
            uploader,
            fileUrl
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
        const papers = await Paper.find({status: 'approved' }).sort({ createdAt: -1 });
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


//not used yet 

exports.postFileController = async (req, res) => {
    try {
        console.log("file",req.file)
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        // Assuming you're using a service like AWS S3, Cloudinary, etc. to store files
        // Here, we'll just return the file path for demonstration purposes
        const fileUrl = `/uploads/${req.file.filename}`; // Adjust based on your storage solution
        res.status(200).json({
            success: true,
            message: "File uploaded successfully",
            fileUrl: fileUrl,
        });
    } catch (err) {
        console.error("Error uploading file:", err);
        res.status(500).json({
            message: "Internal server error",
            error: err.message,
        });
    }
};