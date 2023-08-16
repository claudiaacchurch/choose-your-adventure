const { Configuration, OpenAIApi } = require("openai");
const apiKey = require("../apiKey/apiKey");
const configuration = new Configuration({
  apiKey: apiKey,
});

const askGPT = async (messages) => {
  const openai = new OpenAIApi(configuration);
  console.log(messages);
  const chatCompletion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: messages,
    temperature: 1,
  });
  const response = chatCompletion.data.choices[0].message;
  const content = response.content;
  const contentObject = JSON.parse(content);
  return contentObject;
};

module.exports = askGPT;

/*https://github.com/openai/openai-node*/
