const mongoose = require("mongoose")

const Schema = mongoose.Schema;

let contentsSchema = new Schema({
    //usersID: {type: Schema.Types.ObjectId, ref: 'users'},
    topic: {type: String},
    post: {type: String},
    comment: {type: [String]}
})

module.exports = mongoose.model("contents", contentsSchema)