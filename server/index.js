const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
const uri = process.env.MONGO_URL;
const port = 5000;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("db is connected."))
  .catch((err) => console.log(err));

const articlesRoute = require("./routes/posts");
app.use("/api/posts", articlesRoute);

app.listen(port, () => console.log("server is running"));
