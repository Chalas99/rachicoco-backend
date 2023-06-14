/** path */
const express = require("express");
const router = express.Router();
const systemuserController = require('../controllers/systemuser.controller')

module.exports = function () {
  router.post("/SystemUserLogin", systemuserController.signInSystemUser);
  return router;
}