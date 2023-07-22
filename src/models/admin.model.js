const { db } = require('../config/database');

const addProduct = (data, res) => {
    const Name = data.Name;
    const category = data.category;
    const description = data.description;
    const moisture_level = data.moisture_level;
    const Acid_level = data.Acid_level;
    const EC_level = data.EC_level;

    const sql = "INSERT INTO products (Name, category, description, moisture_level, Acid_level, EC_level) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(sql, [Name, category, description, moisture_level, Acid_level, EC_level], (error, results) => {
      if (error) {
        return res.json({ error: "Internal Server Error!" });
      } else {
        return res.send({ success: true, results: results, message: "Product added successfully" });
      }
    });
};

module.exports = {
    addProduct
  }