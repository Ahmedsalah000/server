const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const questionRoutes = require('./routes/questionRoutes');
// const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const cors = require('cors');
//! security packages
const helmet = require("helmet");//to secure express app
const xss = require("xss-clean");//to prevent cross site scripting
const mongoSanitize = require("express-mongo-sanitize");//to prevent mongo injection
dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors());
app.options('*', cors());
app.disable("x-powered-by");


// Security
app.use(helmet());//
app.use(xss());
app.use(mongoSanitize());


app.use('/api/questions', questionRoutes);


// app.use(notFound);
// app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running on port ${PORT}`));