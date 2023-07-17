const { db } = require('../config/database');

const createCustomer = (data, res) => {
    const firstName = data.firstName;
    const lastName = data.lastName;
    const contactNo = data.contactNo;
    const email = data.email;
    const password = data.password;

    const sql = "INSERT INTO customers (firstName, lastName, contactNo, email, password) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [firstName, lastName, contactNo, email, password], (error, results) => {
      if (error) {
        return res.json({ error: "Internal Server Error!" });
      } else {
        return res.send({ success: true, results: results, message: "User registered successfully" });
      }
    });
};

const findCustomer = (email, res) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM customers WHERE email=?";
      db.query(sql, email, (error, results) => {
        if (error) throw error;

        if (results.length === 0 && !error) {
          resolve();
        } else {
          reject();
        }
      });
  });
};

const signInCustomer = (email) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM customers WHERE email=?";
      db.query(sql, email, (error, results) => {
        if (error) throw error;

        if (results.length === 0 && !error) {
          reject();
        } else {
          resolve(results[0]);
        }
      });
  });
};

module.exports = {
  createCustomer,
  findCustomer,
  signInCustomer
}