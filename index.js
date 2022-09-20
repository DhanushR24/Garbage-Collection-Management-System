const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const port = process.env.PORT || 3000;

const { checkUser } = require("./helpers/helper");
const userRouter = require("./routers/UserRouter");

const app = express();
app.use(morgan("dev"));
app.use(express.static("public"));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(userRouter);

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
