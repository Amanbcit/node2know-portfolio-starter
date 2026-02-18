const express = require('express');
const path = require('path');
const router = express.Router();

// base directory setup
const pagesDir = path.join(__dirname, '..', '..', 'pages');

// page routes
router.get('/', (req, res) => {
    res.sendFile(path.join(pagesDir, 'index.html'));
})
router.get('/about', (req, res) => {
    res.sendFile(path.join(pagesDir, 'about.html'));
})
router.get('/projects', (req, res) => {
    res.sendFile(path.join(pagesDir, 'projects.html'));
})
router.get('/contact', (req, res) => {
    res.sendFile(path.join(pagesDir, 'contact.html'));
})

// post/ contact form
router.post('/contact', (req, res) => {
    const {name, email, message} = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({success: false, message: 'Please enter a valid name, email and message'});
    }

    // log the submission
    console.log(`${name} with ${email} have sent ${message}`);

    // succession
    res.status(200).json({success: true, message:`Thank you fo, ${name}! We have received you message!`});
});


module.exports = router;