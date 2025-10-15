const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors'); 
const cookieParser = require('cookie-parser');
dotenv.config();

//external modules
const {routes}  = require('./Routes/index');

const app = express();



app.use(express.json());

const allowedOrigins = [
  'https://pastpaperportal.vercel.app'
];
app.use(cors({
  origin: allowedOrigins,  // your frontend
  credentials: true,                // allow cookies
}));
app.use(cookieParser());

routes(app);


const PORT = process.env.PORT;
mongoose.connect(process.env.MONGO_DB_URL).then(()=>{
  console.log("Connected to MongoDB successfully");
  app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`)
})
}).catch((err)=>{
  console.error("Error connecting to MongoDB", err);
})
