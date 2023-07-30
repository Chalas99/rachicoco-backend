const ImageModel = require('../models/image.model');

const uploadImage = (req, res) => {
    let image = {image: req.file.buffer};
    ImageModel.insertImage(image, (result) => {
        res.send('Image uploaded...');
    });
};

const getImage = (req, res) => {
    ImageModel.getImageById(req.params.id, (result) => {
        if(result.length > 0)
            res.send(result[0].image);
        else
            res.status(404).send('Not found');
    });
};

module.exports = {
    getImage,
    uploadImage
   
  }
