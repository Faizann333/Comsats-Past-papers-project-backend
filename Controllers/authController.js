const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

exports.postSignupController = async (req, res) => {
    try {
        const { name, registrationNumber, watsappNumber, email, password , confirmPassword } = req.body;
       
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        if (
            !name ||
            !registrationNumber ||
            !email ||
            !password ||
            !watsappNumber
        ) {
            return res.status(400).json({
                success: false,
                message: "All required fields must be provided",
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User with this email already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            registrationNumber,
            watsappNumber,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        const token = jwt.sign(
            { userId: newUser._id, email: newUser.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                userId: newUser._id,
                name: newUser.name,
                registrationNumber: newUser.registrationNumber,
                watsappNumber: newUser.watsappNumber,
                email: newUser.email,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

exports.postLoginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }
        const user = await User.findOne ({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password",
            });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password",
            });
        }  
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        // console.log("Setting cookie with token:", token);
        res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                userId: user._id,
                name: user.name,
                registrationNumber: user.registrationNumber,
                watsappNumber: user.watsappNumber,
                email: user.email,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

exports.postLogoutController = (req, res) => {
    res.clearCookie("token", {
        path: "/", 
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
    });
    res.status(200).json({
        success: true,
        message: "Logout successful",
    });
}




exports.getMeController = async (req, res) => {
  try {
    // get token from cookies
    const token = req.cookies.token;
 
    if (!token) {
      return res.status(400).json({ success: false, message: "No token found" });
    }

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // find user without password , exclude password field
    const user = await User.findById(decoded.userId).select("-password");
    console.log(user)
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};
