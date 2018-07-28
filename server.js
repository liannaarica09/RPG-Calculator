const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the React app
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Password generator listening on ${port}`);