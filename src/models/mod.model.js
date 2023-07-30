const { db } = require('../config/database');


const recordemp = (data, res) => {
    const Name = data.Name;
    const job_role = data.job_role;
    const NIC = data.NIC;
    const contactNo = data.contactNo;
    const DOB = data.DOB;
    const hireDate = data.hireDate;
    const address = data.address;

    const sql = "INSERT INTO employees (name, jobRole, NIC, contactNo, dob, hireDate, address) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(sql, [Name, job_role, NIC, contactNo, DOB, hireDate, address], (error, results) => {
      if (error) {
        return res.json({ error: "Internal Server Error!" });
      } else {
        return res.send({ success: true, results: results, message: "employee added successfully" });
      }
    });
};

const findAllEmp = (res) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM employees";
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

const deleteEmp = (ID) => {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM employees WHERE userID=?";
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

const recordsup = (data, res) => {
  const Name = data.Name;
  const type = data.job_role;
  const NIC = data.NIC;
  const contactNo = data.contactNo;
  const address = data.address;
  const materials = data.DOB;
  const description = data.DOB;

  const sql = "INSERT INTO suppliers (name, type, NIC, contactNo, address, materials, description) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(sql, [Name, type, NIC, contactNo, address, materials, description], (error, results) => {
    if (error) {
      return res.json({ error: "Internal Server Error!" });
    } else {
      return res.send({ success: true, results: results, message: "supplier added successfully" });
    }
  });
};

const findAllsup = (res) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM suppliers";
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

const deleteSup = (ID) => {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM suppliers WHERE userID=?";
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

const createTicket = (data, res) => {
  const Name = data.Name;
  const email = data.email;
  const subject = data.subject;
  const type = data.type;
  const description = data.description;

  const sql = "INSERT INTO support_tickets (Name, email, subject, type, description) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [Name, email, subject, type, description], (error, results) => {
    if (error) {
      return res.json({ error: "Internal Server Error!" });
    } else {
      return res.send({ success: true, results: results, message: "ticket added successfully" });
    }
  });
};
module.exports = {
    recordemp,
    recordsup,
    findAllEmp,
    findAllsup,
    createTicket,
    deleteEmp,
    deleteSup
  }