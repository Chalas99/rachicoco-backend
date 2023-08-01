const store = require('../models/store.model');

const findAllOrders = async(req, res) => {
  
    try {
      await store.findAllOrders(res).then((orders) =>{
            if (orders) {
                return res.send({
                error: false,
                orders: orders,
                message: 'succsessfully order received',
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

  const viewOrder = async(req, res) => {
    const ID = req.params.id;
    try {
      await store.findOrderDetail(ID).then(async (results) => {
        if (results) {
            return res.send({
            error: false,
            data: results,
            message: 'Product veiwed successfully',
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
    findAllOrders,
    viewOrder
   
  }