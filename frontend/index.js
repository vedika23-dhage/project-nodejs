const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// Array to store feedback data (in memory, replace with database in production)
let feedbackData = [];

// Route for displaying the feedback form
app.get('/', (req, res) => {
    res.send(`
        <h1>Feedback Collection Form</h1>
        <form action="/submit-feedback" method="post">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required><br><br>
            <label for="feedback">Feedback:</label><br>
            <textarea id="feedback" name="feedback" rows="4" cols="50" required></textarea><br><br>
            <label for="rating">Rating:</label>
            <input type="number" id="rating" name="rating" min="1" max="5" required><br><br>
            <button type="submit">Submit Feedback</button>
        </form>
    `);
});

// Route for submitting feedback
app.post('/submit-feedback', (req, res) => {
    const { username, feedback, rating } = req.body;

    // Validate input
    if (!username || !feedback || !rating || isNaN(rating) || rating < 1 || rating > 5) {
        return res.status(400).send('Invalid input');
    }

    // Save feedback data (in memory, replace with database in production)
    feedbackData.push({ username, feedback, rating });

    res.send('Feedback submitted successfully');
});

// Route for displaying all feedback data (for testing purposes)
app.get('/feedback-data', (req, res) => {
    res.json(feedbackData);
});

// Start the server
app.listen(port, () => console.log(`Frontend listening at http://localhost:${port}`));