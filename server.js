const express = require('express');
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');


//midleware
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));

// Serve static files from the React app
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

app.use(cors());
app.use(routes);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/rpgcalc", { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("we're connected!");
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Server listening on ${port}`);