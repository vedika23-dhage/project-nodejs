const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = 3001;

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// MongoDB connection URI (replace 'your_database_name' with your actual database name)
const MONGODB_URI = 'mongodb://localhost:27017/your_database_name';

// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Create mongoose schema and model for feedback
const feedbackSchema = new mongoose.Schema({
    username: String,
    feedback: String,
    rating: Number
});
const Feedback = mongoose.model('Feedback', feedbackSchema);

// Route for handling feedback submission
app.post('/submit-feedback', (req, res) => {
    const { username, feedback, rating } = req.body;

    // Validate input
    if (!username || !feedback || !rating || isNaN(rating) || rating < 1 || rating > 5) {
        return res.status(400).send('Invalid input');
    }

    // Create new feedback document
    const newFeedback = new Feedback({
        username,
        feedback,
        rating
    });

    // Save feedback to MongoDB
    newFeedback.save()
        .then(() => {
            res.send('Feedback submitted successfully');
        })
        .catch(err => {
            console.error('Error saving feedback to MongoDB:', err);
            res.status(500).send('Error saving feedback');
        });
});

// Start the server
app.listen(port, () => console.log(`Backend listening at http://localhost:${port}`));