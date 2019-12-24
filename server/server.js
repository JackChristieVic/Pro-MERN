const express = require('express');

// create an Express application/object
const app = express();
const PORT = 3000;

// using the static middleware function to serve static files in the public folder
const fileServerMiddleware = express.static('public');
app.use('/', fileServerMiddleware);


app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`)
})