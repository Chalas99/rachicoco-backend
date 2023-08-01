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

const findAllCustomers = (res) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM customers";
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
      const sql =
        "INSERT INTO support_tickets (name, email, subject, type, description) VALUES (?, ?, ?, ?, ?)";
      db.query(
        sql,
        [name, email, subject, type, description],
        (err, results) => {
          if (err) {
            return res.json({ error: "Internal Server Error" });
          } else {
            console.log(results);
            return res.json({ success: "support ticket Successfully Added" });
          }
        }
      );

};

const getProductFromCart = (ID) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM products WHERE productID=?";
      db.query(sql, ID, (error, results) => {
        if (error) throw error;
        if (!error) {
          resolve(results[0]);
        } else {
          reject();
        }
      });
  });
};

const addToCart = (ID) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM products WHERE productID=?";
      db.query(sql, ID, (error, results) => {
        if (error) throw error;
        if (!error) {
          resolve(results[0]);
        } else {
          reject();
        }
      });
  });
};

const createOrder = (customerID, totalPrice, status, date) => {
  return new Promise((resolve, reject) => {
    const sql ="INSERT INTO orders (cusID, totalPrice, status, dateTime) VALUES (?, ?, ?, ?)";
    db.query(sql, [customerID, totalPrice, status, date], (error, results) => {
      if (error) {
        console.log(err);
        reject();
      } else {
        const sql ="SELECT * FROM orders ORDER BY orderID DESC LIMIT 1";
        db.query(sql, [], (err, results) => {
          if (err) {
            reject();
          } else {
            console.log(results);
            resolve(results[0]);
          }
        });
      }
    });
  });
};

const placeOrderItems = (orderID, cart) => {
    const sql ="INSERT INTO order_items (orderID, productID, quantity, price) VALUES (?, ?, ? ,?)";
    db.query(sql, [orderID, cart.productID, cart.quantity, cart.price,], (err, results) => {
        if (err) {
          console.log("error");
        }
      }
    );
};

const getOrders = (ID) => {
  return new Promise((resolve, reject) => {
    const sql ="SELECT order_items.*, products.Name, products.description, orders.dateTime, orders.status FROM order_items INNER JOIN orders ON order_items.orderID = orders.orderID INNER JOIN products ON order_items.productID = products.productID  WHERE orders.cusID = ? ORDER BY order_items.order_itemsID DESC";
    db.query(
      sql,
      ID,
      (error, results) => {
        if (error) {
          reject();
        } else {
          resolve(results);
        }
      }
    );
  });
};

module.exports = {
  createCustomer,
  findCustomer,
  signInCustomer,
  addSupportTicket,
  addToCart,
  getProductFromCart,
  findAllCustomers,
  placeOrderItems,
  getOrders,
  createOrder
}