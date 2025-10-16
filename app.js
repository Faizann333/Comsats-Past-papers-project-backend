const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
dotenv.config();

// External modules
const { routes } = require('./Routes/index');

const app = express();

// Define allowed origins
const allowedOrigins = [
  'https://pastpaperportal.vercel.app',  // Replace with your frontend URL
];

// CORS configuration
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);  // Allow the request
    } else {
      callback(new Error('Not allowed by CORS'));  // Block the request
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'],  // Allowed headers
  credentials: true,  // Allow cookies and credentials
  optionsSuccessStatus: 200,  // For legacy browsers (IE11, various SmartTVs)
}));

// Handle preflight OPTIONS requests for CORS (preflight handling for all routes)
app.options('*', (req, res) => {
  // Set CORS headers manually for OPTIONS request
  res.setHeader('Access-Control-Allow-Origin', 'https://pastpaperportal.vercel.app'); // Set your allowed origin here
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');  // Allowed methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allowed headers
  res.setHeader('Access-Control-Allow-Credentials', 'true'); // Allow credentials
  res.status(200).end();  // Respond to OPTIONS request with status 200
});

app.use(express.json());
app.use(cookieParser());

// Your routes
routes(app);

const PORT = process.env.PORT;
mongoose.connect(process.env.MONGO_DB_URL).then(() => {
  console.log("Connected to MongoDB successfully");
  app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error("Error connecting to MongoDB", err);
});
