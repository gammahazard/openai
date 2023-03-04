const express = require('express');
require('dotenv').config();
const { Configuration, OpenAIApi } = require('openai');

const app = express()
app.use(express.json())

const configuration = new Configuration({
apiKey: process.env.API_KEY,

});
const openai = new OpenAIApi(configuration);

app.post("/find-complexity", async (req, res) => {
    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt:`
            const example = (arr) => {
                arr.map((item) => {
                    console.log(item2);
                });
            };

                The time complexity of this function is
                    ###
            `,
            max_tokens:64,
            temperature: 0,
            top_p: 1.0,
            frequency_penalty: 0.0,
            stop: ["\n"],
                })
            
        
        return res.status(200).json({
            success: true,
            data: response.data.choices[0].text
        });
    } catch (error){
        return res.status(400).json({
            sucess: false,
            error: error.response? error.response.data: "Issue with server",

        });
    }
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`server listening on ${port}`))