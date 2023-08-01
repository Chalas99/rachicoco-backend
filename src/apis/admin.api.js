/** path */
const express = require("express");
const router = express.Router();
const adminController = require('../controllers/admin.controller');

module.exports = function () {
  router.post("/AddProductForm",(req, res) =>  adminController.addProducts(req, res));
  router.get("/GetAllProducts",(req, res) =>  adminController.findAllProducts(req, res));
  router.delete("/deleteproduct/:id",(req, res) =>  adminController.deleteProduct(req, res));
  router.post("/adduser",(req, res) =>  adminController.addUsers(req, res));
  router.get("/GetAllUsers",(req, res) =>  adminController.findAllUsers(req, res));
  router.delete("/deleteuser/:id",(req, res) =>  adminController.deleteUsers(req, res));
  router.post("/reports/sales",(req, res) =>  adminController.getSalesData(req, res));
  router.get("/getCustomerCount",(req, res) =>  adminController.getCustomerCount(req, res));
  router.get("/getOrderCount",(req, res) =>  adminController.getOrderCount(req, res));
  return router;
}
