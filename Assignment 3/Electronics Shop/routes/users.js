const express = require("express");
let router = express.Router();
let User = require("../models/user");
const bcrypt = require("bcryptjs");
router.get("/signup", (req, res) => {
  res.render("signUp", { pageTitle: "User signUp" });
});

// router.get("/login", (req, res) => {
//   res.render("login", { pageTitle: "Login" });
// });
router.get("/login", (req, res) => {
  res.render("login", {
    pageTitle: "User Login",
    success_msg: req.flash("success"),
    danger_msg: req.flash("danger"),
  });
});

router.post("/login", async function (req, res) {
  let user = await User.findOne({ email: req.body.email });

  if (!user) {
    req.flash("danger", "User with this email not present");
    return res.redirect("/login");
  }
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (validPassword) {
    req.session.user = user;
    req.flash("success", "Logged in successfully");
    return res.redirect("/home");
  } else {
    req.flash("danger", "Invalid password");
    return res.redirect("/login");
  }
});

router.get("/logout", (req, res) => {
  req.session.user = null;
  req.flash("success", "Logout successfully");
  res.redirect("/login");
});
router.post("/signup", async (req, res) => {
  let userObj = req.body;
  userObj.role = "user";
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(userObj.password, salt);
  userObj.password = hashed;
  let user = new User(userObj);
  await user.save();
  req.flash("success", "SignUp successfully");
  res.redirect("/login");
});

module.exports = router;
