const { db } = require('../config/database');

const recordemp = (data, res) => {
    const Name = data.Name;
    const job_role = data.job_role;
    const NIC = data.NIC;
    const contactNo = data.contactNo;
    const DOB = data.DOB;
    const address = data.address;

    const sql = "INSERT INTO employees (name, jobRole, NIC, contactNo, dob, address) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(sql, [Name, job_role, NIC, contactNo, DOB, address], (error, results) => {
      if (error) {
        return res.json({ error: "Internal Server Error!" });
      } else {
        return res.send({ success: true, results: results, message: "employee added successfully" });
      }
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

module.exports = {
    recordemp,
    recordsup
  }