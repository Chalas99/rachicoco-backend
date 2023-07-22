const admin = require('../models/customer.model');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
  
  const addProducts = async (req, res) => {
    try {
          const {Name, category, description, moisture_level, Acid_level, EC_level} = req.body;

  
            const data = {
              Name:Name,
              category:category,
              description:description,
              moisture_level: moisture_level,
              Acid_level: Acid_level,
              EC_level: EC_level,
            };
    
            await admin.addProduct(data, res);
            } catch (error) {
              res.json({ error: "Internal Server Error!" });
            }
            
            }

  module.exports = {
    addProducts,
   
  }