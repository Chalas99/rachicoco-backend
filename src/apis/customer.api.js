/** path */
const express = require("express");
const router = express.Router();
const customerController = require('../controllers/customer.controller');

module.exports = function () {
  router.post("/signup",(req, res) =>  customerController.signUpCustomer(req, res));
  router.post("/signin",(req, res) => customerController.signIncustomer(req, res));
  router.post("/supportTicket", (req,res) => customerController.addSupportTicket(req, res));
  router.get("/cart/:id", (req,res) => customerController.getProductFromCart(req,res));
  router.get("/GetAllCustomers",(req, res) =>  customerController.findAllCustomers(req, res));
  router.get("/getOrders/:id", (req,res) => customerController.getOrders(req,res));
  return router;
}
