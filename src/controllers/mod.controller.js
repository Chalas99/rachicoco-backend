const Moderator = require('../models/mod.model');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
  
  const recordempDetails = async (req, res) => {
    try {
          const {Name, job_role, NIC, contactNo, DOB, hireDate, address} = req.body;

  
            const data = {
              Name:Name,
              job_role:job_role,
              NIC:NIC,
              contactNo: contactNo,
              DOB: DOB,
              hireDate: hireDate,
              address: address,
            };
    
            await Moderator.recordemp(data, res);
            } catch (error) {
              res.json({ error: "Internal Server Error!" });
            }
            
            }

    const findAllEmployees = async(req, res) => {

      try {
        await admin.findAllEmp(res).then((employees) =>{
              if (employees) {
                  return res.send({
                  error: false,
                  employees: employees,
                  message: 'succsessfully employee detail received',
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

    const deleteEmployee = async(req, res) => {
      const ID = req.params.id;
      try {
        await Moderator.deleteEmp(ID).then(async (results) => {
          if (results.affectedRows !== 0) {
              return res.send({
              error: false,
              message: 'Employee deleted successfully',
            });
          }else{
            return res.send({
              error: true,
              message: 'No record on this ID',
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

    const recordsupDetails = async (req, res) => {
    try {
          const {Name, type, NIC, contactNo, address, materials, description} = req.body;

  
            const data = {
              Name:Name,
              type:type,
              NIC:NIC,
              contactNo: contactNo,
              address: address,
              materials: materials,
              description: description,
            };
    
            await Moderator.recordsup(data, res);
            } catch (error) {
              res.json({ error: "Internal Server Error!" });
            }
            
            }

    const findAllSuppliers = async(req, res) => {

      try {
        await admin.findAllSup(res).then((suppliers) =>{
              if (suppliers) {
                  return res.send({
                  error: false,
                  suppliers: suppliers,
                  message: 'succsessfully supplier detail received',
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

    const deleteSupplier = async(req, res) => {
      const ID = req.params.id;
      try {
        await admin.deleteSup(ID).then(async (results) => {
          if (results.affectedRows !== 0) {
              return res.send({
              error: false,
              message: 'Supplier deleted successfully',
            });
          }else{
            return res.send({
              error: true,
              message: 'No record on this ID',
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

    const createTicket = async (req, res) => {
      try {
        const {Name, email, subject, type, description} = req.body;
  
        const data = {
          Name:Name,
          email:email,
          subject:subject,
          type:type,
          description:description,
        };
  
        await Moderator.createTicket(data, res);
  
      } catch (error) {
        res.json({ error: "Internal Server Error!" });
      }
        
    }
  module.exports = {
    recordempDetails,
    recordsupDetails,
    findAllEmployees,
    findAllSuppliers,
    createTicket,
    deleteEmployee,
    deleteSupplier
   
  }