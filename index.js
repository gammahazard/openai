const express = require('express');
const app = express();
const path = require('path');
const { Configuration, OpenAIApi } = require('openai');

// Configure environment variables
require('dotenv').config();

// Configure OpenAI API
const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);

// Configure Express to use EJS as the view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
// Configure Express to parse JSON request bodies
app.use('/public', express.static(path.join(__dirname, 'public'), {
    setHeaders: (res, path, stat) => {
      if (path.endsWith('.js')) {
        res.set('Content-Type', 'text/javascript');
      }
    }
  }));
// Route for rendering the index page
app.get('/', (req, res) => {
  res.render('index');
});
app.use(express.static('public'));
// Route for handling the form submission
app.post('/find-complexity', async (req, res) => {
  try {
    // Get the function from the request body
    const func = req.body.function;

    // Call OpenAI API to get the time complexity of the function
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `
        const example = (${func}) => {
          // TODO: calculate time complexity
          // return time complexity;
        };

        The time complexity of this function is
        ###`,
      max_tokens: 1000,
      temperature: 0,
      top_p: 1.0,
      frequency_penalty: 0.0,
      stop: ['\n'],
    });

    // Return the time complexity to the client
    return res.status(200).json({
      success: true,
      data: response.data.choices[0].text,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.response ? error.response.data : 'Issue with server',
    });
  }
});
app.post('/explain-python', async (req, res) => {
    try {
      const { code } = req.body;
      
      // Call OpenAI API to explain the code
      const response = await openai.createCompletion({
        model: "code-davinci-002",
        prompt:`# Python 3 \n${code}\n\n# Explanation of what this code does\n\n#`,
        temperature: 0,
        max_tokens: 2400,
        top_p: 1.0,
        frequency_penalty: 0.0,
        stop: ['\n'],
      });
      return res.status(200).json({
        success: true,
        data: response.data.choices[0].text.trim(),
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: error.response ? error.response.data : 'Issue with server',
      });
    }
  });


  // app.post('/ask-anything', async (req, res) => {
  //   try {czZ
  //     const { question } = req.body;
  
  
  
  //     const response = await openai.createCompletion({
  //       model: "text-davinci-003",
  //       prompt: "I am a highly intelligent question answering bot. If you ask me a question that is rooted in truth, I will give you the answer. If you ask me a question that is nonsense, trickery, or has no clear answer, I will respond with \"Unknown\".\n\nQ: " + question + "\nA:",
  //       temperature: 0,
  //       max_tokens: 2500,
  //       top_p: 1,
  //       frequency_penalty: 0.0,
  //       presence_penalty: 0.0,
  //       stop: ["\n"],
  //     });

  //     res.json({ success: true, data: response.data.choices[0].text.trim() });
  //   } catch (error) {
  //     res.status(500).json({ success: false, error: error.message });
   
  //   }
  // });
  app.post('/generate-image', async (req, res) => {
    try {
      const { codejava } = req.body;
      
      // Call OpenAI API to explain the code
      const openai = new OpenAIApi(configuration);
      const response = await openai.createImage({
        prompt:  codejava,
        n: 1,
        size: "512x512",
      });

      return res.status(200).json({
        success: true,
        data: response.data
     
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: error.response ? error.response.data : 'Issue with server',
      });
    }
  });
  app.post('/generate-animal', async (req, res) => {
    try {
      console.log("Request received to generate animal");
      const prompt = "give me one type of species within the Petalonamae, Hemichordata, Ctenophora, Xenacoelomorpha or Proarticulata phyla"
      const prompt2 = "give me one type of species within the Archaeocyatha, Agmata, Brachiopoda, Entoprocta, Echinodermata, Mollusca, Micrognathozoa, Kinorhyncha or Loricifera phyla"
      // Call OpenAI API to generate the animals
      const responses = await Promise.all([
        openai.createCompletion({
          model: 'text-davinci-003',
          prompt: prompt,
          temperature: 0.25,
          max_tokens: 60,
          top_p: 1.00,
          frequency_penalty: 0,
          presence_penalty: 0,
        }),
        openai.createCompletion({
          model: 'text-davinci-003',
          prompt: prompt2,
          temperature: 0.75,
          max_tokens: 60,
          top_p: 1.00,
          frequency_penalty: 0.85,
          presence_penalty: 0,
        }),
      ]);
      console.log("Responses received from OpenAI API");
  
      // Get the generated animals from the response
      const animals = responses.map(response => response.data.choices[0].text.trim());
      console.log("Animals generated: ", animals);
  
      // Call OpenAI API to generate the images
      const imageResponses = await Promise.all([
        openai.createImage({
          prompt: animals[0],
          n: 2,
          size: "512x512",
        }),
        openai.createImage({
          prompt: animals[1],
          n: 2,
          size: "512x512",
        }),
      ]);
      
      // Extract the image URLs from the response
      const imageUrls = imageResponses.map(response => response.data.data[0].url);
      
      // Return the animals and their image URLs
      return res.status(200).json({
        success: true,
        animals: animals,
        imageUrls: imageUrls,
      });
    } catch (error) {
      console.log("Error generating animal: ", error);
      return res.status(400).json({
        success: false,
        error: error.response ? error.response.data : 'Issue with server',
      });
    }
  });
// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});