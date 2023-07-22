/** path */
const express = require("express");
const router = express.Router();
const adminController = require('../controllers/admin.controller');

module.exports = function () {
  router.post("/AddProductForm",(req, res) =>  adminController.addProducts(req, res));
  return router;
}
