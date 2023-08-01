const { db } = require('../config/database');

const createUser = (data, res) => {
    const firstName = data.firstName;
    const lastName = data.lastName;
    const email = data.email;
    const userRole = data.userRole;
    // const startingDate = data.startingDate;
    const password = data.password;

    const sql = "INSERT INTO sysusers (firstName, lastName, email, userRole, password) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(sql, [firstName, lastName, email, userRole, password], (error, results) => {
      if (error) {
        return res.json({ error: "Internal  Error!" });
      } else {
        return res.send({ success: true, results: results, message: "User registered successfully" });
      }
    });
};

const findUser = (email, res) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM sysusers WHERE email=?";
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

const signInUser = (email) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM sysusers WHERE email=?";
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
  createUser,
  findUser,
  signInUser
}