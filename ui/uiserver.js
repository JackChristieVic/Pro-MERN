const express = require('express');
const app = express();

app.use(express.static('public'));
app.listen(8000, () =>
    console.log('UI started on port 8000')
);