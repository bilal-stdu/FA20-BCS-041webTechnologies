const express = require("express");
let router = express.Router();
let employee = require("../models/employee");

router.get("/employeelist", async (req, res) => {
  let Employee = await employee.find();
  res.render("employeeList", {
    title: "Employees list",
    Employee,
  });
});

router.get("/manageEmployee", async (req, res) => {
  let Employee = await employee.find();
  res.render("manageEmployee", {
    title: "Manage Employees",
    Employee,
    success_msg: req.flash("success_msg"),
  });
});

router.get("/addEmployee", (req, res) => {
  res.render("addEmployee", {
    title: "Add New Employee",
  });
});

router.post("/addEmployee", async (req, res) => {
  let Employee = new employee(req.body);
  await Employee.save();
  req.flash("success_msg", "Employee added successfully");
  res.redirect("/manageEmployee");
});

router.get("/employee/:id", async function (req, res) {
  let Employee = await employee.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Employee deleted successfully");
  res.redirect("/manageEmployee");
});
module.exports = router;
