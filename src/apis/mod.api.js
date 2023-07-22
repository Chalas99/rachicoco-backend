const express = require("express");
const router = express.Router();
const modController = require('../controllers/mod.controller');

module.exports = function () {
  router.post("/AddEmpForm",(req, res) => modController.recordempDetails (req, res));
  router.post("/AddSupForm",(req, res) => modController.recordsupDetails(req, res));
  return router;
}
