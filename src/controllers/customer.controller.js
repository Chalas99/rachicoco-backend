const Customer = require('../models/customer.model');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
};

const signUpCustomer = async (req, res) => {
  try {
        const {firstName, lastName, contactNo, email, userRole, password} = req.body;
        await Customer.findCustomer(email, res).then(async () => {
          try {
            const salt = await bcrypt.genSalt(10);
          const hashPassword = await bcrypt.hash(password, salt);

          const data = {
            firstName:firstName,
            lastName:lastName,
            contactNo:contactNo,
            email: email,
            userRole: userRole,
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
              const role = customer.userRole;
              return res.send({
                error: false,
                user: {email,token,id,role},
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

const addSupportTicket = async (req, res) => {
  const { name, email, type, subject, description } = req.body;

  if (!name) {
    return res.json({ error: "Name is required!" });
  }

  if (!email) {
    return res.json({ error: "Email is required!" });
  }

  if (!subject) {
    return res.json({ error: "Subject is required!" });
  }

  if (!description) {
    return res.json({ error: "Description is required!" });
  }

  try {
    const data = {
      name: name,
      email: email,
      type: type,
      subject: subject,
      description: description,
    };
    rootModel.addSupportTicket(data, res);
  } catch (err) {
    res.json({ error: err });
  }
};

  module.exports = {
    signUpCustomer,
    signIncustomer,
    addSupportTicket
  }