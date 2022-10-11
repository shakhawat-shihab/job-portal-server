const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const userRoute = require("./routes/v1/user.route");

//middlewares
app.use(express.json());
app.use(cors());


//routes
app.use("/api/v1/user", userRoute);


app.get("/", (req, res) => {
    res.send("Route is working! YaY!");
});

module.exports = app;




