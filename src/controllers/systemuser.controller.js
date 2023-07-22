const SystemUser = require('../models/systemuser.model')
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


const createToken = (id) => {
  return jwt.sign({id}, process.env.SECRET, { expiresIn: '3d' })
};

const createSysUser = async (req, res) => {
  try {
    const {firstName, lastName, email, userRole, password} = req.body;
    await SystemUser.findUser(email, res).then(async () => {
      try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const data = {
          firstName:firstName,
          lastName:lastName,
          email: email,
          userRole: userRole,
          password: hashPassword,
        };

        await SystemUser.createUser(data, res);
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

const signInSystemUser = async(req,res) => {
    const {email, password} = req.body

    try {
      if (!email || !password) {
        return res.send({
          error: true,
          message: 'All fields must be filled',
        });
      }
    
      try {
        await SystemUser.signInUser(email).then(async (user) =>{
          if (user) {
            bcrypt.compare(password, user.password).then((match) =>{
              if (match) {
                const token = createToken(user.userID)
                const id = user.userID;
                const role = user.userRole;
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

  module.exports = {
    signInSystemUser,
    createSysUser
  }