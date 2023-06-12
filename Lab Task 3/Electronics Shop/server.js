const express = require("express");
const products = require("./routes/api/products");
var sessionAuth = require("./middlewares/sessionAuth");
const session = require("express-session");
const app = express();
app.use(
  session({
    secret: "your secret here",
    cookie: { maxAge: 1800000 },
    resave: false,
    saveUninitialized: true,
  })
);

const path = require("path");
const flash = require("connect-flash");
app.use(flash());

var cookieParser = require("cookie-parser");
app.set("view engine", "ejs");
app.use(sessionAuth);

app.use(express.static(path.join(__dirname, "public")));
const expressLayouts = require("express-ejs-layouts");

app.use(express.json());
app.use(expressLayouts);
app.use(products);
app.use(cookieParser());

// Add this middleware before defining your routes
app.use(express.urlencoded({ extended: true }));

const homepageRouter = require("./routes/home");

const ProductsRouter = require("./routes/products");
const adminPageRouter = require("./routes/admin");
const userRouter = require("./routes/users");
const adminUserRouter = require("./routes/adminUser");
app.use(ProductsRouter);
app.use(homepageRouter);
app.use(adminPageRouter);
app.use(userRouter);
app.use(adminUserRouter);
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/productscrud", {
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
