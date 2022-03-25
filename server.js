require('root-path')();
const express = require('express');
const app = express();
const cors = require('cors');
const errorHandler = require('./_middlewares/error-handler');
const path = require('path')
const color = require('colors')

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// static files
app.use(express.static(path.join(__dirname, 'public')))

// api routes
app.get('/', (req, res, next) => {
    res.send('public/index.html')
})
app.use('/subscribers', require('./subscribers/subscriber.routes'));


// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`.rainbow));
