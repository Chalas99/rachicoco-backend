const { db } = require('../config/database');

const createCustomer = (data, res) => {
  const firstName = data.firstName;
  const lastName = data.lastName;
  const contactNo = data.contactNo;
  const email = data.email;
  const userRole = data.userRole;
  const password = data.password;

  const sql = "INSERT INTO customers (firstName, lastName, contactNo, email, userRole, password) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(sql, [firstName, lastName, contactNo, email, userRole, password], (error, results) => {
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

const addSupportTicket = (data, res) => {
  const { name, email, type, subject, description } = data;
  db.getConnection((err, connection) => {
    if (err) {
      return res.json({ error: err });
    } else {
      const sql =
        "INSERT INTO support_tickets (name, email,  subject, type, description) VALUES (?, ?, ?, ?, ?)";
      connection.query(
        sql,
        [name, email, subject, type, description],
        (err, results) => {
          connection.release();
          if (err) {
            return res.json({ error: "Internal Server Error" });
          } else {
            console.log(results);
            return res.json({ success: "support ticket Successfully Added" });
          }
        }
      );
    }
  });
};

module.exports = {
  createCustomer,
  findCustomer,
  signInCustomer,
  addSupportTicket
}