const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const questionRoutes = require('./routes/questionRoutes');
// const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const cors = require('cors');
dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors());
app.options('*', cors());


app.use('/api/questions', questionRoutes);
app.use(cors());
app.options('*', cors());

// app.use(notFound);
// app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running on port ${PORT}`));
