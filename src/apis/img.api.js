const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const imageController = require('../controllers/image.controller');


module.exports = function () {
    router.post('/upload', upload.single('image'), imageController.uploadImage);
    router.get('/image/:id', imageController.getImage);
    return router;
  }



