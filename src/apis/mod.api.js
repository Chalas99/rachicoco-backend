const express = require("express");
const router = express.Router();
const modController = require('../controllers/mod.controller');

module.exports = function () {
  router.post("/AddEmpForm",(req, res) => modController.recordempDetails (req, res));
  router.post("/AddSupForm",(req, res) => modController.recordsupDetails(req, res));
  router.get("/employeeDetail",(req, res) =>  modController.findAllEmployees(req, res));
  router.get("/supplierDetail",(req, res) =>  modController.findAllSuppliers(req, res));
  router.post("/createTicket",(req, res) => modController.createTicket (req, res));

  return router;
}
