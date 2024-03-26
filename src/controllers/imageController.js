const OpenAIApi = require("openai");


const openai = new OpenAIApi({
  apiKey: process.env.OPENAI_API_KEY,
});


const aiImage = async (req, res) => {
  try {
    const description = req.body.description;
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: description,
      n: 1,
      size: "1024x1024",
    });

    console.log(response.data);
    
    const imageUrl = response.data[0].url;
    const imageDescription = response.data[0].revised_prompt;


    res.status(200).json({
      success: true,
      url: imageUrl,
      description: imageDescription
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