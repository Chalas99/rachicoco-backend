const admin = require('../models/admin.model');
  
  const addProducts = async (req, res) => {
    try {
      const {Name, category, price, description, moisture_level, Acid_level, EC_level} = req.body;

      const data = {
        Name:Name,
        category:category,
        price:price,
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
    }
  }

  const deleteProduct = async(req, res) => {
    const ID = req.params.id;
    try {
      await admin.deleteProduct(ID).then(async (results) => {
        if (results.affectedRows !== 0) {
            return res.send({
            error: false,
            message: 'Product deleted successfully',
          });
        }else{
          return res.send({
            error: true,
            message: 'No record on this ID',
          });
        }
      })
    } catch (error) {
      return res.send({
        error: true,
        message: 'Something went wrong!',
      }); 
    }
  }

  module.exports = {
    addProducts,
    findAllProducts,
    deleteProduct
   
  }