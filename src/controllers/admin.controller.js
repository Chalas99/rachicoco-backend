const admin = require('../models/admin.model');
  
  const addProducts = async (req, res) => {
    try {
      const {Name, category, price, description, moisture_level, Acid_level, EC_level} = req.body;

      const data = {
        Name:Name,
        category:category,
        quantity:1,
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
  
  const findAllUsers = async(req, res) => {
  
    try {
      await admin.findAllUsers(res).then((users) =>{
            if (users) {
                return res.send({
                error: false,
                users: users,
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
  const deleteUsers = async(req, res) => {
    const ID = req.params.id;
    try {
      await admin.deleteuser(ID).then(async (results) => {
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
  const getSalesData = async (req, res) => {
    const { from, to } = req.body;
  console.log(req.body);
    if (!to) {
      return res.json({ error: "To Date Can't be empty" });
    }
  
    if (!from) {
      return res.json({ error: "From Date Can't be empty" });
    }
  
    try {
      await admin.getSalesData(from, to, res).then((results) => {
        if(results){
          return res.send({
            error: false,
            records: results,
            message: 'succsessfully received sales data!',
          });
        }
      });
    } catch (error) {
      return res.json({ error: error });
    }
  };

  const getCustomerCount = async(req, res) => {
  
    try {
      await admin.getCustomerCount(res).then((count) =>{
            if (count) {
                return res.send({
                error: false,
                count: count,
                message: 'count received succsessfully ',
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

  const getOrderCount = async(req, res) => {
  
    try {
      await admin.getOrderCount(res).then((count) =>{
            if (count) {
                return res.send({
                error: false,
                count: count,
                message: 'count received succsessfully ',
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
  module.exports = {
    addProducts,
    findAllProducts,
    deleteProduct,
    findAllUsers,
    deleteUsers,
    getSalesData,
    getOrderCount,
    getCustomerCount
   
  }