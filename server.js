const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv'); //environmental variables
const cors = require('cors'); //middleware
const bodyParser = require('body-parser');
const { dbConnect } = require('./src/config/dbConnect'); 

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 4445;

//root route
app.route('/').get((req, res) => {
res.send('Rachicoco business process handling System');
});

app.listen(PORT, () => {
      dbConnect();
    console.log(`Server is up and running on PORT ${PORT}`);
    });