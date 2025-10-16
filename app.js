const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors'); 
const cookieParser = require('cookie-parser');
dotenv.config();

// External modules
const { routes } = require('./Routes/index');

const app = express();

//  Allow all origins (note: credentials still allowed)
app.use(cors({
  origin: true,          // Reflects the request origin (for CORS with credentials)
  credentials: true,     // Allow cookies and credentials
}));

app.use(express.json());
app.use(cookieParser());

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
