const express = require("express");
const router = express.Router();
const systemuserController = require('../controllers/systemuser.controller')

module.exports = function () {
  router.post("/AddUser",(req, res) => systemuserController.createSysUser(req, res));
  router.post("/SigninUser",(req, res) => systemuserController.signInSystemUser(req, res));
  return router;
}