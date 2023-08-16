const askGPT = require("./apiClient");

let chatGPTMessages = [];

const GameController = {
  StartGame: async (req, res) => {
    chatGPTMessages.length = 0;
    const genre = req.body.genre;
    const initialMessage = {
      role: "system",
      content:
        `I want you to play like a classic text adventure game. I will be the protagonist and main player. Don’t refer to yourself. The setting of this game will have a theme of ${genre}.` +
        `Give each go some sort of jeopardy, keep it exciting, make the user have a fun experience!!!!!!!!` +
        `Have it follow a sort of journey that is leading towards completing some sort of quest` +
        `keep it exciting!!!!!` +
        `Each setting has a description of 100 words followed by an array of 3 possible actions that the player can perform.` +
        `The game is a maximum of 5 rounds, so when you reach the fifth round end the game and then give no more options for the user!` +
        `Have the adventure follow a set path. The success of the adventure is determined by the choices the player makes.` +
        `One of these three actions is fatal and ends the game and another is a winning choice that wins the game. Never add other explanations. Don/’t refer to yourself.` +
        `Your responses are just in JSON format like this example: \n\n###\n\n {"setting":"setting description", "actions":["action 1", "action 2", "action 3"]}\n\n###\n\n`,
    };
    chatGPTMessages.push(initialMessage);
    const response = await askGPT(chatGPTMessages);
    const chatResponse = {
      role: "assistant",
      content: JSON.stringify(response),
    };
    chatGPTMessages.push(chatResponse);
    return res.status(200).json({ response: response });
  },

  MakeAction: async (req, res) => {
    const action = req.body.action;
    const nextStep = {
      role: "user",
      content: action,
    };
    chatGPTMessages.push(nextStep);
    const response = await askGPT(chatGPTMessages);
    const chatResponse = {
      role: "assistant",
      content: JSON.stringify(response),
    };
    chatGPTMessages.push(chatResponse);
    return res.status(200).json({ response: response });
  },
};

module.exports = GameController;
