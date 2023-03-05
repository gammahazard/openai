# OpenAI API Test

A webpage for testing OpenAI API with three example prompts.

## Deployed App

The app is deployed on Heroku and can be accessed at https://openai-cool.herokuapp.com/

## Usage

You will need an API_KEY from OpenAI, after downloading the project and running npm install, make .env and set API_KEY as the API key from your OpenAI dashboard.

### Find Time Complexity

To find the time complexity of a function, input the function into the prompt and the API will return the time complexity.

The OpenAI API model used for this prompt is text-davinci-003.

### Explain Python Code

To get an explanation of a Python code snippet, input the code into the prompt and the API will return an explanation of what the code does.

The OpenAI API model used for this prompt is code-davinci-002.

### Check Grammar

To check the grammar of a sentence, input the sentence into the prompt and the API will return a corrected sentence.

The OpenAI API model used for this prompt is also text-davinci-003.

### Prompt Structure

The wording of the prompt and the choice of API model can drastically change the response you get from the OpenAI API. For example, to retrieve the time complexity, the prompt uses the following structure:

```js
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

### Conclusion

OpenAI API is a powerful tool for natural language processing. It allows developers to structure prompts in many different ways and include any user input they may have allowed. This makes it very interesting to play around with and see the many different outputs that can be achieved.