const express = require("express");
let router = express.Router();
let Product = require("../models/products");
var checkSessionAuth = require("../middlewares/checkSessionAuthUser");

//Store Data in Db
router.get("/addProducts", (req, res) => {
  res.render("addProduct", { pageTitle: "Add Products" });
});

//cart
router.get("/cart/:id", checkSessionAuth, async function (req, res) {
  let product = await Product.findById(req.params.id);
  product = product.toObject();
  product.quantity = 1;
  let cart = [];
  if (req.cookies.cart) cart = req.cookies.cart;
  cart.push(product);
  res.cookie("cart", cart);
  req.flash("success_msg", "Product added to cart successfully");
  res.redirect("/products");
});

//updating Cart
router.post("/cart/update/:id", (req, res) => {
  const productId = req.params.id;
  const newQuantity = req.body.newQuantity;
  let cart = [];
  if (req.cookies.cart) cart = req.cookies.cart;
  const productIndex = cart.findIndex((product) => product._id === productId);
  if (productIndex !== -1) {
    cart[productIndex].quantity = newQuantity;
  }
  res.cookie("cart", cart);
  req.flash("success_msg", "Cart updated successfully");
  res.redirect("/cart");
});

//Removing Products from cart
router.get("/cart/remove/:id", async function (req, res) {
  let cart = [];
  if (req.cookies.cart) cart = req.cookies.cart;
  cart.splice(
    cart.findIndex((c) => (c._id = req.params.id)),
    1
  );
  res.cookie("cart", cart);
  req.flash("success_msg", "Product removed from cart successfully");
  res.redirect("/cart");
});

module.exports = router;
