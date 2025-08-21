const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '')));

app.post('/subscribe', (req, res) => {
    console.log(req.body);
    const email = req.body.email;
    if (email) {
        const emailEntry = `${new Date().toISOString()},${email}\n`;
        fs.appendFile('subscribers.txt', emailEntry, (err) => {
            if (err) {
                console.error('Error writing to file', err);
                return res.status(500).json({ success: false, message: 'Error saving email.' });
            }
            res.json({ success: true, message: 'Thank you for subscribing!' });
        });
    } else {
        res.status(400).json({ success: false, message: 'Email is required.' });
    }
});

app.post('/propose-talk', (req, res) => {
    const { name, email, subject, description } = req.body;
    if (name && email && subject && description) {
        const proposalEntry = `Date: ${new Date().toISOString()}\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\nDescription: ${description}\n---\n`;
        fs.appendFile('flash_talk_proposals.txt', proposalEntry, (err) => {
            if (err) {
                console.error('Error writing to file', err);
                return res.status(500).json({ success: false, message: 'Error saving proposal.' });
            }
            res.json({ success: true, message: 'Thank you for your proposal!' });
        });
    } else {
        res.status(400).json({ success: false, message: 'All fields are required.' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
});

