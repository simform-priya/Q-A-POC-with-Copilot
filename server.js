const express = require('express');
const axios = require('axios');
require('dotenv').config();
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// API endpoint to handle user questions
app.post('/api/question', async (req, res) => {
    const { question } = req.body;

    if (!question) {
        return res.status(400).json({ error: 'Question is required' });
    }

    const geminiApiKey = process.env.OPENAI_API_KEY;
    const geminiApiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiApiKey}`;

    try {
        const response = await axios.post(geminiApiUrl, {
            contents: [
                {
                    parts: [
                        { text: question }
                    ]
                }
            ]
        },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (response.data && response.data.candidates && response.data.candidates.length > 0) {
            const answer = response.data.candidates[0].content.parts[0].text; // Extract the text from content.parts[0]
            res.json({ answer });
        } else {
            console.error('Unexpected API response:', response.data);
            res.status(500).json({ error: 'Invalid response from Gemini API' });
        }
    } catch (error) {
        if (error.response) {
            if (error.response.status === 404) {
                console.error('API Error: Endpoint not found. Please check the API URL.');
                res.status(404).json({ error: 'API endpoint not found. Please verify the URL.' });
            } else {
                console.error('API Error:', error.response.status, error.response.data);
                res.status(error.response.status).json({ error: error.response.data });
            }
        } else {
            console.error('Error:', error.message);
            res.status(500).json({ error: 'Failed to fetch answer' });
        }
    }
});

// Serve the frontend
app.use(express.static('public'));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});