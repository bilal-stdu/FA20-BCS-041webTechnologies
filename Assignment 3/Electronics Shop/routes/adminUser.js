const express = require("express");
let router = express.Router();
let User = require("../models/user");
const bcrypt = require("bcryptjs");
router.get("/adminSignup", (req, res) => {
  res.render("adminSignup", { pageTitle: "Admin SignUp" });
});

// router.get("/login", (req, res) => {
//   res.render("login", { pageTitle: "Login" });
// });
router.get("/adminLogin", (req, res) => {
  res.render("adminLogin", {
    pageTitle: "Admin Login",
    success_msg: req.flash("success"),
    danger_msg: req.flash("danger"),
  });
});

router.post("/adminLogin", async function (req, res) {
  let user = await User.findOne({ email: req.body.email });

  if (!user) {
    req.flash("danger", "Admin with this email not present");
    return res.redirect("/adminLogin");
  }
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (validPassword) {
    req.session.user = user;
    req.flash("success", "Admin Logged in successfully");
    return res.redirect("/home");
  } else {
    req.flash("danger", "Invalid password");
    return res.redirect("/adminLogin");
  }
});

router.get("/adminlogout", (req, res) => {
  req.session.user = null;
  req.flash("success", "Admin Logout successfully");
  res.redirect("/adminLogin");
});
router.post("/adminSignup", async (req, res) => {
  let userObj = req.body;
  userObj.role = "admin";
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(userObj.password, salt);
  userObj.password = hashed;
  let user = new User(userObj);
  await user.save();
  req.flash("success", "Admin SignUp successfully");
  res.redirect("/adminLogin");
});

module.exports = router;
