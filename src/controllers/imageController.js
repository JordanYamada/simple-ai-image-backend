const OpenAIApi = require("openai");

// this configuration will allow us to pass our API key during our request for a new image
const openai = new OpenAIApi({
  apiKey: process.env.OPENAI_API_KEY,
});


const aiImage = async (req, res) => {
  try {
    const description = req.body.description;
    // console.log("REQUEST:", req.method, req.path);
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: description,
      // prompt: 'Cat in a Hat',
      n: 1,
      size: "1024x1024",
    });

    console.log(response.data);
    const imageUrl = response.data[0].url;

    res.status(200).json({
      success: true,
      data: imageUrl
    });

  } catch (e) {

// error handling from openai docs
    console.log(e);
    console.log(e.response);
    if (e.response) {
      console.log(e.response.status);
      console.log(e.response.data);
    } else {
      console.log(e.message);
    }
    res.status(400).json({
      e: 'Unable to create an image'
    })
  }
};



module.exports = { aiImage };