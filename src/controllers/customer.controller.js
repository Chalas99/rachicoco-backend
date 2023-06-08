const Customer = require('../models/customer.model');
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const signUpCustomer = async (req, res) => {
    try {
          const customer = await Customer.findOne({ email: req.body.email });
          if (customer){
            return res
                  .status(409)
                  .send({ message: "User with given email already Exist!" });
          }
  
          const salt = await bcrypt.genSalt(10);
          const hashPassword = await bcrypt.hash(req.body.password, salt);
  
          const newCustomer = await new Customer({ ...req.body, password: hashPassword }).save();
          if (newCustomer){
            return res.status(200).send({ message: "User registered successfully" });
          }
  
      } catch (error) {
          res.status(500).send({ message: "Internal Server Error" });
      }
  }

  module.exports = {
    signUpCustomer
  }