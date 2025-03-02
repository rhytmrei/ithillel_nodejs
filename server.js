'use strict';

const express = require('express');
const mongoose  = require("mongoose");
//
(require("dotenv")).config();
//
const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
    .connect(MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

app.use(express.json());
// Routes
require("./src/routes/route.task")(app);
//
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
