const askGPT = require("./apiClient");

let chatGPTMessages = [];

const GameController = {
  StartGame: async (req, res) => {
    // res.json({ message: "we successfully came to the controller" });
    chatGPTMessages.length = 0;
    // console.log("logging messages", chatGPTMessages);
    const genre = req.body.genre;
    console.log("logging genre", genre);
    const initialMessage = {
      role: "system",
      content:
        `I want you to play like a classic text adventure game. I will be the protagonist and main player. Don’t refer to yourself. The setting of this game will have a theme of ${genre}.` +
        `Each setting has a description of 150 characters followed by an array of 3 possible actions that the player can perform.` +
        `A game should end after 10 turns with a successful outcome if I have not selected a game ending action.` +
        `Have the adventure follow a set path. The success of the adventure is determined by the choices the player makes.` +
        `One of these actions is fatal and ends the game. Never add other explanations. Don/’t refer to yourself.` +
        `Your responses are just in JSON format like this example: \n\n###\n\n {"setting":"setting description", "actions":["action 1", "action 2", "action 3"]}\n\n###\n\n`,
    };
    chatGPTMessages.push(initialMessage);
    const response = await askGPT(chatGPTMessages);
    chatGPTMessages.push(response);
    // console.log("logging more messages", chatGPTMessages);
    return res.status(200).json({ response: response });
  },

  MakeAction: async (req, res) => {
    const action = req.body.action;
    const nextStep = {
      role: "user",
      content: action
    };
    chatGPTMessages.push(nextStep);
    const response = await askGPT(chatGPTMessages);
    chatGPTMessages.push(response);
    return response;
  }
  
};

module.exports = GameController;
