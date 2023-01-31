const express = require('express');
const connectDB = require('./database/db');


const app = express();

app.use(express.json({ limit: "100mb" }));

app.use(
  express.urlencoded({ extended: true })
);

const userRoutes = require("./routes/userRoutes");

app.use("/api/", userRoutes);

connectDB();

const port  = process.env.PORT || 4000;

app.listen(port , function(){
    console.log("Server Started");
});