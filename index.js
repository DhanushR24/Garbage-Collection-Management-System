const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const port = process.env.PORT || 3000;

const app = express();
app.use(morgan("dev"));
app.use(express.static("public"));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

mongoose.connect(
  "mongodb+srv://DbConnect:test12345@cluster.bh7j7.mongodb.net/GarbageCollection",
  () => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
);
