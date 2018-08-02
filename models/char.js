const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const charSchema = new Schema({

    name: { type: String, required: true },
    gameType: { type: String, required: true }
});

const Char = mongoose.model("Char", charSchema);

module.exports = Char;