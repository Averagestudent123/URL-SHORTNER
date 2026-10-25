import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    originalURL: {type: String, require: true},
    shortURL: {type: String, require: true, unique: true},
    clicks: {type: Number, default: 0}
}, {timestamps: true})

export default mongoose.model("url", urlSchema)