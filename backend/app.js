const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");
const api = process.env.API;

const app = express();

app.use(cors());
app.options("*", cors());

//middleware

app.use(express.json());
app.use(morgan("tiny"));

//routes
const problemsRoutes = require("./routes/problems");
const tagsRoutes = require("./routes/tags");
const laddersRoute = require("./routes/ladders");
const usersRoutes = require("./routes/users");

app.use(`${api}/problems`, problemsRoutes);
app.use(`${api}/tags`, tagsRoutes);
app.use(`${api}/ladders`, laddersRoute);
app.use(`${api}/users`, usersRoutes);

//database

mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "cp-helper",
  })
  .then(() => {
    console.log("Database Connection is ready...");
  })
  .catch((err) => {
    console.log(err);
  });

//server

app.listen(3100, () => {
  console.log("server is running http://localhost:3100");
  //   console.log(`${api}/problems`)
});
