"use strict";
const axios = require("axios");
const AWS = require("aws-sdk");
const sharp = require("sharp");

// Configure AWS SDK with credentials
const s3 = new AWS.S3({
  accessKeyId: `${process.env.AWS_ACCESS_KEY_ID}`
});


const saveImage = async (req, res) => {
  try {
    const image = req.body.params.image;
    
    // Fetch the image data from the provided URL
    const response = await axios.get(image, { responseType: 'arraybuffer' });


    // Convert the image to JPEG format using sharp
    const jpegBuffer = await sharp(response.data)
      .jpeg()
      .toBuffer();

    
      // Create a unique filename
    const filename = `${Date.now()}.jpeg`;


    // Prepare params for uploading to S3
    const params = {
      Bucket: 'dalle-image-storage',
      Key: filename,
      Body: jpegBuffer,
      ContentType: 'image/jpeg',
    };

    // Upload image to S3
    await s3.upload(params).promise();

    
    // Respond with the S3 URL of the uploaded image
    const imageUrl = `https://dalle-image-storage.s3.amazonaws.com/${filename}`;
    res.status(200).json({
      success: true,
      url: imageUrl
    });
  } catch (error) {
    console.error('Error proxying image:', error);
    res.status(500).json({ error: 'An error occurred while proxying the image' });
  }
};

module.exports = { saveImage };