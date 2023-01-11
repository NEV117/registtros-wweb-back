require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const resRoutes = require("./routes/registros");
const userRoutes = require("./routes/user");

//npm init -y
//npm install express
//npm install dotenv
//npm install mongoose
//express app-------------------------------------------------------
const app = express();

//midelware
app.use(express.json());

const port = process.env.PORT || 4044;

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/registros", resRoutes);
app.use("/api/user", userRoutes);

/* app.get('/', (req, res) => {
    res.json({mssg: "Welcome to the app"})

}) */

// connect to db
mongoose
  .connect(process.env.MONG_URI)
  .then(() => {
    // listen for requests
    app.listen(port, () => {
      console.log("connected to db & listening on port", process.env.port);
    });
  })
  .catch((error) => {
    console.log(error);
  });
