const express = require('express');
//const mongoose = require('mongoose');
const dotenv = require('dotenv'); //environmental variables
const cors = require('cors'); //middleware
const bodyParser = require('body-parser');
//const { dbConnect } = require('./src/config/dbConnect'); 
const { db } = require('./src/config/database');


//import APIs
const CustomerApi = require('./src/apis/customer.api');
const SysUserApi = require('./src/apis/systemuser.api')
const AdminApi = require('./src/apis/admin.api');
const modApi = require('./src/apis/mod.api');
const imgApi = require('./src/apis/img.api');

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

//const PORT = process.env.PORT || 4445;
const DB_PORT = process.env.DB_PORT || 4445;

//root route
app.route('/').get((req, res) => {
res.send('Rachicoco business process handling System');
});

//register router - CHANGEABLE
app.use('/', CustomerApi());
app.use('/Sysuser', SysUserApi());
app.use('/Admin', AdminApi());
app.use('/moderator', modApi());
app.use('/img', imgApi());

// app.listen(PORT, () => {
//       dbConnect();
//     console.log(`Server is up and running on PORT ${PORT}`);
//     });

app.listen(DB_PORT, () => {
  console.log(`Server is up and running on PORT ${DB_PORT}`);
}) 