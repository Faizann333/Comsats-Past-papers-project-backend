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

// CORS configuration (this should be applied first, before routes)
app.use(cors({
  origin: (origin, callback) => {
    // If no origin (i.e., local requests) or origin is allowed
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






// const express = require('express');
// const dotenv = require('dotenv');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const cookieParser = require('cookie-parser');
// dotenv.config();

// // External modules
// const { routes } = require('./Routes/index');

// const app = express();

// // Define allowed origins
// const allowedOrigins = [
//   'https://pastpaperportal.vercel.app',  // Replace with your frontend URL
// ];

// // CORS configuration
// app.use(cors({
//   origin: (origin, callback) => {
//     // If no origin (i.e., during local requests), allow it
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);  // Allow the request
//     } else {
//       callback(new Error('Not allowed by CORS'));  // Block the request
//     }
//   },
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Allowed HTTP methods
//   allowedHeaders: ['Content-Type', 'Authorization'],  // Allowed headers
//   credentials: true,  // Allow cookies and credentials
//   optionsSuccessStatus: 200,  // For legacy browsers (IE11, various SmartTVs)
// }));

// // Automatically handle preflight OPTIONS requests (no need to define `app.options('*', ...)`)
// app.use((req, res, next) => {
//   if (req.method === 'OPTIONS') {
//     res.setHeader('Access-Control-Allow-Origin', 'https://pastpaperportal.vercel.app'); // Your frontend URL
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     res.setHeader('Access-Control-Allow-Credentials', 'true');
//     return res.status(200).end();  // Respond with a 200 status for OPTIONS requests
//   }
//   next();
// });

// app.use(express.json());
// app.use(cookieParser());

// // Your routes
// routes(app);

// const PORT = process.env.PORT;
// mongoose.connect(process.env.MONGO_DB_URL).then(() => {
//   console.log("Connected to MongoDB successfully");
//   app.listen(PORT, () => {
//     console.log(`Server is running on port http://localhost:${PORT}`);
//   });
// }).catch((err) => {
//   console.error("Error connecting to MongoDB", err);
// });
