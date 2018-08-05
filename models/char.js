const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const charSchema = new Schema({
    name: { type: String, required: true },
    gameSystem: { type: String, required: true },
    user: { type: String, required: true },
    gMaster: { type: String }
});

const Char = mongoose.model("Char", charSchema);

module.exports = Char;