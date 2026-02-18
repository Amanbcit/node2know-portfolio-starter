const express = require('express');
const morgan = require('morgan');
const path = require('path');

const pageRouter = require('./src/server/routes/pageRouter.js')
const apiRouter = require('./src/server/routes/apiRouter.js')

const app = express();
const PORT = process.env.PORT || 3000;

//  Middleware
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Routers
app.use('/', pageRouter);
app.use('/api', apiRouter);

// 404 Handling
// Unknown /api/* routes → JSON
app.use('/api', (req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// All other unknown routes → plain text 404
app.use((req, res) => {
  res.status(404).send('404 — Page not found');
});

app.use((req,res)=>{
    res.status(404).send('404 Page Not Found');
});

// start the server
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT} at http://localhost:${PORT}`);
})