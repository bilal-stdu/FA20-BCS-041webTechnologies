const express = require("express");

const app = express();

const path = require("path");

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
const expressLayouts = require("express-ejs-layouts");

app.use(express.json());
app.use(expressLayouts);

// Add this middleware before defining your routes
app.use(express.urlencoded({ extended: true }));
const employeeRouter = require("./routes/employee");
app.use(employeeRouter);
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/employeescrud", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection to MongoDB created");
  })
  .catch((err) => {
    console.log("Error Connecting");
    console.log(err);
  });

app.listen(4000, () => {
  console.log("Server Started");
});
