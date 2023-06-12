const express = require("express");
let router = express.Router();
let Product = require("../models/products");

router.get("/admin", async (req, res) => {
  let products = await Product.find();
  res.render("AdminPage", {
    title: "Admin Page",
    products,
    success_msg: req.flash("success_msg"),
  });
});

//Adding Products
// router.post("/addProducts", async (req, res) => {
//   let product = new Product(req.body);
//   await product.save();
//   res.redirect("/admin");
// });

//Adding Products with Validation
router.post("/addProducts", async (req, res) => {
  const { name, Price } = req.body;

  let errors = [];
  if (!name) errors.push({ msg: "Please enter a product name" });

  if (!Price || isNaN(Price || Price < 0))
    errors.push({ msg: "Please enter a valid price" });

  if (errors.length > 0) res.render("addProduct", { errors });
  else {
    let product = new Product(req.body);
    await product.save();
    req.flash("success_msg", "Product added successfully");
    res.redirect("/admin");
  }
});

//Displaying Records
router.get("/products", async (req, res) => {
  let products = await Product.find();
  res.render("products", {
    title: "Products list",
    products,
    success_msg: req.flash("success_msg"),
  });
});

// router.get("/products", async (req, res) => {
//   let products = await Product.find();
//   res.render("products", { title: "Products list", products },   success_msg: req.flash("success_msg"),);
// });

//getting Product Id
// router.get("/products/:id", async function (req, res) {
//   res.send("ID from URL" + req.params.id);
// });

//deleteing records
router.get("/products/:id", async function (req, res) {
  let product = await Product.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Product deleted successfully");
  res.redirect("/admin");
});

//rendering edit page
router.get("/editProduct", (req, res) => {
  res.render("editProduct", { title: "Edit Products" });
});

//updating
router.get("/editProduct/:id", async function (req, res) {
  let product = await Product.findById(req.params.id);
  res.render("editProduct", { product });
});

//updating
router.post("/editProduct/:id", async function (req, res) {
  let product = await Product.findById(req.params.id);
  product.name = req.body.name;
  product.Price = req.body.Price;
  await product.save();
  req.flash("success_msg", "Product updated successfully");
  res.redirect("/admin");
});

module.exports = router;
