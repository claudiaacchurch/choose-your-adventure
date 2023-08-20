const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();
const apiKey = process.env.API_KEY;
const configuration = new Configuration({
  apiKey: apiKey,
});

const askGPT = async (messages) => {
  const openai = new OpenAIApi(configuration);
  const chatCompletion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: messages,
    temperature: 0.7,
  });
  const response = chatCompletion.data.choices[0].message;
  const content = response.content;
  console.log("String to be parsed:", content);
  const parsedData = JSON.parse(content);

  return parsedData;
};

module.exports = askGPT;

/*https://github.com/openai/openai-node*/
