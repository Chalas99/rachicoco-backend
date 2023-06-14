const Customer = require('../models/customer.model');
/** function */
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
};

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

  const signIncustomer = async(req,res) => {
      const {email, password} = req.body

      try {
        if (!email || !password) {
          return res.send({
            error: true,
            message: 'All fields must be filled',
          });
        }
      
        const customer = await Customer.findOne({ email })
        if (!customer) {

          return res.send({
            error: true,
            message: 'Incorrect email',
          });
        }
      
        const match = await bcrypt.compare(password, customer.password)
        if (!match) {
          return res.send({
            error: true,
            message: 'Incorrect password',
          });
        }
    
        const token = createToken(customer._id)
        const id = customer._id;
        return res.send({
          error: false,
          data: email,token,id,
          message: 'succsessfully logged in',
        });

      } catch (error) {
        return res.send({
          error: true,
          message: 'something went wrong',
        });
      }
    } 


  module.exports = {
    signUpCustomer,
    signIncustomer
  }