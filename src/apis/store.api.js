const express = require("express");
const router = express.Router();
const storeController = require('../controllers/store.controller');

module.exports = function () {
  router.get("/GetOrders",(req, res) => storeController.findAllOrders(req, res));
  router.get("/ViewOrders/:id",(req, res) => storeController.viewOrder(req, res));
  return router;
}
