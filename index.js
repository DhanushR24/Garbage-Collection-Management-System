const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const port = process.env.PORT || 3000;

const { checkUser } = require("./helpers/helper");
const userRouter = require("./routers/UserRouter");
const collectRouter = require("./routers/collectRouter");

const app = express();
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(cookieParser());

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.set("view engine", "ejs");

mongoose
  .connect(
    "mongodb+srv://DbConnect:test12345@cluster.bh7j7.mongodb.net/GarbageCollection?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((res) => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => console.log(err));

app.get("*", checkUser);
app.get("/", (req, res) => {
  res.render("main", {
    title: "Home",
  });
});

app.use(userRouter);
app.use(collectRouter);

app.get("/map", (req, res) => {
  res.render("index", {
    title: "Map",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Oops",
  });
});
