"use strict";


const saveImage = async (req, res) => {
  try {
    const imageUrl = req.body.imageUrl;
    
    // Fetch the image data from the provided URL
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    
    // Here, you can perform any necessary conversions or manipulations on the image data
    const blob = new Blob([response.data], { type: response.headers['content-type'] });

      // Create a File object from the blob
      const file = new File([blob], 'image.png', { type: 'image/png' });


      // Create a URL representing the image file
      const url = URL.createObjectURL(file);
    
    // Respond with the converted image URL
    res.status(200).json({
      success: true,
      url: url,
    });
  } catch (error) {
    console.error('Error proxying image:', error);
    res.status(500).json({ error: 'An error occurred while proxying the image' });
  }
};

module.exports = { saveImage };