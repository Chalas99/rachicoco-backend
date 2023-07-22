const Customer = require('../models/customer.model');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
};

const signUpCustomer = async (req, res) => {
  try {
        const {firstName, lastName, contactNo, email, password} = req.body;
        await Customer.findCustomer(email, res).then(async () => {
          try {
            const salt = await bcrypt.genSalt(10);
          const hashPassword = await bcrypt.hash(password, salt);

          const data = {
            firstName:firstName,
            lastName:lastName,
            contactNo:contactNo,
            email: email,
            password: hashPassword,
          };
  
          await Customer.createCustomer(data, res);
          } catch (error) {
            res.json({ error: "Internal Server Error!" });
          }
          
          })

    } catch (error) {
      return res.send({
      error: true,
      message: 'User already exists!',
    });
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
  
    try {
      await Customer.signInCustomer(email).then(async (customer) =>{
        if (customer) {
          bcrypt.compare(password, customer.password).then((match) =>{
            if (match) {
              const token = createToken(customer.customerID)
              const id = customer.customerID;
              return res.send({
                error: false,
                data: email,token,id,
                message: 'succsessfully logged in',
              });
            }
            return res.send({
              error: true,
              message: 'Incorrect password',
            });
          })            
        }
      })
    } catch (error) {
      return res.send({
        error: true,
        message: 'Incorrect email',
      }); 
    }

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