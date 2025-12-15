const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

// Import routes
const healthRoute = require("./routes/health.route");
const userRoute = require("./routes/user.route");

// Import middlewares
const errorMiddleware = require("./middlewares/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Health check route
app.get('/', (req, res) => {
    res.json({
        status: 'OK',
        message: 'API is running',
    })
})
app.use('/health', healthRoute);

// User routes
app.use('/api/users', userRoute);

// Error handling middleware
app.use(errorMiddleware);

module.exports = app;