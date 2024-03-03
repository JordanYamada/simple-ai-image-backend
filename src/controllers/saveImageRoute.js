"use strict";
const axios = require("axios")


const saveImage = async (req, res) => {
  try {
    const image = req.body.image;
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!: ', image)
    
    // Fetch the image data from the provided URL
    const response = await axios.get(image, { responseType: 'arraybuffer' });
    
    const url = Buffer.from(response.data, 'binary');

    
    // Respond with the converted image URL
    res.status(200).json({
      success: true,
      url: url.toString('base64'),
    });
  } catch (error) {
    console.error('Error proxying image:', error);
    res.status(500).json({ error: 'An error occurred while proxying the image' });
  }
};

module.exports = { saveImage };