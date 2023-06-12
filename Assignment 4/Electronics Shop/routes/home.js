const express = require("express");
let router = express.Router();
var checkSessionAuth = require("../middlewares/checkSessionAuthUser");
// router.get("/home", (req, res) => {
//   res.render("home", { pageTitle: "Home Page" });
// });

router.get("/home", (req, res) => {
  res.render("home", { pageTitle: "Home", success_msg: req.flash("success") });
});

//rendering cart page
router.get("/cart", checkSessionAuth, (req, res) => {
  let cart = req.cookies.cart;
  if (!cart) cart = [];
  res.render("cart", {
    title: "My Shopping Cart Page",
    cart,
    success_msg: req.flash("success_msg"),
  });
});

module.exports = router;
