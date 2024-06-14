const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./configdb/database');
const questionRoutes = require('./routes/questionRoutes');
// const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const cors = require('cors');
// Security packages
const helmet = require('helmet'); // Secure express app
const xss = require('xss-clean'); // Prevent cross site scripting
const mongoSanitize = require('express-mongo-sanitize'); // Prevent mongo injection
const path = require('path'); // Add path module

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors());
app.options('*', cors());
app.disable('x-powered-by');

// Security
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/api/questions', questionRoutes);

// Serve React app for any other route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// app.use(notFound);
// app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`App running running on port ${PORT}`);
});

process.on('unhandledRejection', (err) => {
    console.log(err.name, err.message);
    server.close(() => {
        console.log('unhandledRejection!! shutting down...');
        process.exit(1);
    });
});
