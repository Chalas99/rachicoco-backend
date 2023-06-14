const SystemUser = require('../models/systemuser.model')
/** function */
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
};

  const signInSystemUser = async(req,res) => {
      const {userName, password} = req.body

      try {
        if (!userName || !password) {
          return res.send({
            error: true,
            message: 'All fields must be filled',
          });
        }
      
        const systemuser = await SystemUser.findOne({ userName })
        if (!systemuser) {

          return res.send({
            error: true,
            message: 'Incorrect user name',
          });
        }
      
        const match = await bcrypt.compare(password, systemuser.password)
        if (!match) {
          return res.send({
            error: true,
            message: 'Incorrect password',
          });
        }
    
        const token = createToken(systemuser._id)
        const id = systemuser._id;
        return res.send({
          error: false,
          data: userName,token,id,
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
    signInSystemUser
  }