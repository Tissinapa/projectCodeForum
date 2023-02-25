const mongoose = require("mongoose")

const Schema = mongoose.Schema;

let contentsSchema = new Schema({
    post: {type: String},
    comment: {type: String}
})

module.exports = mongoose.model("contents", contentsSchema)