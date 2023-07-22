const Moderator = require('../models/mod.model');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
  
  const recordempDetails = async (req, res) => {
    try {
          const {Name, job_role, NIC, contactNo, DOB, address} = req.body;

  
            const data = {
              Name:Name,
              job_role:job_role,
              NIC:NIC,
              contactNo: contactNo,
              DOB: DOB,
              address: address,
            };
    
            await Moderator.recordemp(data, res);
            } catch (error) {
              res.json({ error: "Internal Server Error!" });
            }
            
            }

    const recordsupDetails = async (req, res) => {
    try {
          const {Name, type, NIC, contactNo, address, materials, description} = req.body;

  
            const data = {
              Name:Name,
              type:type,
              NIC:NIC,
              contactNo: contactNo,
              address: address,
              materials: materials,
              description: description,
            };
    
            await Moderator.recordsup(data, res);
            } catch (error) {
              res.json({ error: "Internal Server Error!" });
            }
            
            }

  module.exports = {
    recordempDetails,
    recordsupDetails
   
  }