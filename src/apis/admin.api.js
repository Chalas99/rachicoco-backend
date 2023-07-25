/** path */
const express = require("express");
const router = express.Router();
const adminController = require('../controllers/admin.controller');

module.exports = function () {
  router.post("/AddProductForm",(req, res) =>  adminController.addProducts(req, res));
  router.get("/GetAllProducts",(req, res) =>  adminController.findAllProducts(req, res));
  router.delete("/deleteproduct/:id",(req, res) =>  adminController.deleteProduct(req, res));
  return router;
}
