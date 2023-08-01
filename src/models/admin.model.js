const { db } = require('../config/database');

const addProduct = (data, res) => {
  const Name = data.Name;
  const category = data.category;
  const quantity = data.quantity;
  const price = data.price;
  const description = data.description;
  const moisture_level = data.moisture_level;
  const Acid_level = data.Acid_level;
  const EC_level = data.EC_level;

  const sql = "INSERT INTO products (Name, category, quantity, price, description, moisture_level, Acid_level, EC_level) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(sql, [Name, category, quantity, price, description, moisture_level, Acid_level, EC_level], (error, results) => {
    if (error) {
      return res.json({ error: "Internal Server Error!" });
    } else {
      return res.send({ success: true, results: results, message: "Product added successfully" });
    }
  });
};

const findAllProduct = (res) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM products";
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

const deleteProduct = (ID) => {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM products WHERE productID=?";
      db.query(sql, ID, (error, results) => {
        if (error) throw error;
        if (!error) {
          resolve(results);
        } else {
          reject();
        }
      });
  });
};

const addUser = (data, res) => {

  const firstName = data.firstName;
  const lastName = data.lastName;
  const email = data.email;
  const userRole = data.role;
  const password = data.password;

  const sql = "INSERT INTO sysusers ( firstName, lastName, email, userRole, password) VALUES ( ?, ?, ?, ?, ?)";
  db.query(sql, [firstName, lastName, email, userRole, password], (error, results) => {
    if (error) {
      return res.json({ error: " Internal  Error!" });
    } else {
      return res.send({ success: true, results: results, message: "User added successfully" });
    }
  }); 
};

const findAllUsers = (res) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM sysusers";
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

const deleteUser = (ID) => {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM sysusers WHERE userID=?";
      db.query(sql, ID, (error, results) => {
        if (error) throw error;
        if (!error) {
          resolve(results);
        } else {
          reject();
        }
      });
  });
};

const getSalesData = (from, to, res) => {
  return new Promise((resolve, reject) => {
        const sql ="SELECT SUM(totalPrice) AS total, COUNT(orderID) AS orderCount, CAST(dateTime AS DATE) AS date FROM orders WHERE CAST(dateTime AS DATE) BETWEEN ? AND ? GROUP BY CAST(dateTime AS DATE)";
        db.query(sql, [from, to], (err, results) => {
          console.log(results)
          if (err) {
            reject();
          } else {
            resolve(results);
          }
        });
  });
};

const getCustomerCount = (res) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT COUNT(customerID) AS customerCount FROM customers";
      db.query(sql, (error, results) => {
        if (error) throw error;
        if (results && !error) {
          resolve(results[0]);
        } else {
          reject();
        }
      });
  });
};

const getOrderCount = (res) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT COUNT(orderID) AS orderCount FROM orders";
      db.query(sql, (error, results) => {
        if (error) throw error;
        if (results && !error) {
          resolve(results[0]);
        } else {
          reject();
        }
      });
  });
};

module.exports = {
    addProduct,
    findAllProduct,
    deleteProduct,
    addUser,
    findAllUsers,
    deleteUser,
    getSalesData,
    getCustomerCount,
    getOrderCount
  }