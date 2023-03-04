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
      max_tokens: 500,
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
        prompt:"# Python 3 \n "+code+"\n Explanation of what the code does###",
        temperature: 0,
        max_tokens: 500,
        top_p: 1.0,
        frequency_penalty: 0.5,
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
  app.post('/check-grammar', async (req, res) => {
    try {
      const { text3 } = req.body;
  
      const openai = new OpenAIApi(configuration);
  
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "Modify this to be grammatically acceptable and ensure it makes sense and there is no punctuation or other errors. Ensure all words are spelt correctly, if you encounter a word that is not, try to use the context of the sentence to correct it, Ensure there is no sentences that are too short or run on sentences, try to replace adjectives with better sounding synonyms and make the text sound more professional and easy to understand:\n\n$" +text3+"\n\n",
        temperature: 0,
        max_tokens: 500,
        top_p: 1.0,
        frequency_penalty: 0.5,
        stop: ['\n'],
      });
  
      const result = response.data.choices[0].text.trim();
  
      res.json({ data: result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});