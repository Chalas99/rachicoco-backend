const SystemUser = require('../models/systemuser.model')
/** function */
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');



const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
};

const createSysUser = async (req, res) => {
  try {
        const sysuser = await SystemUser.findOne({ email: req.body.email });
        if (sysuser){
          return res
                .status(409)
                .send({ message: "User with given email already Exist!" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        const newSysUser = await new SystemUser({ ...req.body, password: hashPassword }).save();
        if (newSysUser){
          return res.status(200).send({ message: "User registered successfully" });
        }

    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
}

const signInSystemUser = async(req,res) => {
    const {email, password} = req.body

    try {
      if (!email || !password) {
        return res.send({
          error: true,
          message: 'All fields must be filled',
        });
      }
    
      const systemuser = await SystemUser.findOne({ email })
      if (!systemuser) {

        return res.send({
          error: true,
          message: 'Incorrect email',
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
    signInSystemUser,
    createSysUser
  }