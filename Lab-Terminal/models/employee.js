const mongoose = require("mongoose");
const EmployeeSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  department: String,
});

const employee = mongoose.model("employee", EmployeeSchema);
module.exports = employee;
