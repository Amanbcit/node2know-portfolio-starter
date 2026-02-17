const express = require('express');
const path = require('path');
const router = express.Router();

// base directory setup
const pagesDir = path.join(__dirname,'..','..','pages');

// page routes
router.get('/', (req,res)=>{
    res.sendFile(path.join(pagesDir,'index.html'));
})

module.exports = router;