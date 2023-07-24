const admin = require('../models/admin.model');
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

  const findAllProducts = async(req, res) => {
    const {Name} = req.body
  
        try {
          await admin.findAllProduct(res).then((products) =>{
                if (products) {
                    return res.send({
                    error: false,
                    products: products,
                    message: 'succsessfully product received',
                  });
                }
              })
            }
              
        catch (error) {
          return res.send({
            error: true,
            message: 'Internal server error',
          }); 
        }}

  module.exports = {
    addProducts,
    findAllProducts
   
  }