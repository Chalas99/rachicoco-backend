const { db } = require('../config/database');


const findAllOrders = (res) => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM orders";
        db.query(sql, (error, results) => {
          if (error) throw error;
          if (results && !error) {
            resolve(results);
          } else {
            reject();
          }
        });
    });
  };

  const findOrderDetail = (ID) => {
    
    return new Promise((resolve, reject) => {
        const sql = `SELECT o.orderID, o.totalPrice, c.firstName, c.lastName, c.contactNo, c.email, p.productID, p.Name AS productName, oi.quantity, oi.price
        FROM orders AS o
        JOIN customers AS c ON o.cusID = c.customerID
        JOIN order_items AS oi ON o.orderID = oi.orderID
        JOIN products AS p ON oi.productID = p.productID
        WHERE o.orderID=?`;
        db.query(sql, ID, (error, results) => {
          if (error) throw error;
          if (results && !error) {
            resolve(results);
          } else {
            reject();
          }
        });
    });
  };


  module.exports = {
    findAllOrders,
    findOrderDetail
   
  }