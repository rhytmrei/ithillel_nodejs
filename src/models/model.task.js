const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    status: { type: String, enum: ["new", "done"], default: "new" },
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);
