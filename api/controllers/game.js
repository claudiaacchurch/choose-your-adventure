const askGPT = require("./apiClient");

let sessions = {}; 

const GameController = {
  StartGame: async (req, res) => {
    const sessionID = req.body.sessionID;
    if (!sessions[sessionID]) {
      sessions[sessionID] = [];
    }
    sessions[sessionID].length = 0; 

    const genre = req.body.genre;
    const character = req.body.character;
    const difficulty = req.body.difficulty;

    const initialMessage = {
      role: "system",
      content:
        `I want you to simulate a text adventure game. I will be the protagonist of the game.` +
        `This game will have a theme of ${genre} and the protagonist will be a ${character}. And with a difficulty of ${difficulty}` +
        `Always refer to the protagonist in the setting you give.` +
        `When the game starts, give me a short description of the protagonist's appearance along with the setting.` +
        `A round is every setting that you give and also the three possible actions you provide for the protagonist` +
        // `Give each round some sort of jeopardy, keep it exciting, make the user have a fun experience! Keep the scenarios as interesting as possible. ` +
        `Do not repeat actions from the previous setting.` +
        // `Have it follow a sort of journey that is leading towards completing some sort of quest` +
        `Each setting has a description of 80 words maximum, followed by an array of 3 possible actions that the protagonist can perform  and the action that will end the game.` +
        `One of the three of those possible actions that the game provides with each setting should be an action that will end the game when selected. ` +
        `When the player selects an action that does not end the game, the game ganerates a new setting and set of actions.` +
        `When an action that ends the game is selected, the game returns an array of actions with three empty strings and congratulates the player for winning the game or informs the player that something bad happens to the protagonist and the game is over.` +
        `The game is a maximum of 10 sceanarios, so when you reach the 8th round end the game with either a winning scenario or losing scenario and then give no more options for the protagonist.` +
        // `Have the adventure follow a set path. The success of the adventure is determined by the choices the player makes.` +
        // `One of these three actions is fatal for every individual round. Never add other explanations. Don't refer to yourself.` +
        `Your responses are just in JSON format like this example, where status is either "Game Over", "Game Won" or "Continue": \n\n###\n\n {"setting":"setting description", "actions":["action 1", "action 2", "action 3"], "status":"status"}\n\n###\n\n`,
    };
    sessions[sessionID].push(initialMessage);

    try {
      const response = await askGPT(sessions[sessionID]);
      const chatResponse = {
        role: "assistant",
        content: JSON.stringify(response),
      };
      sessions[sessionID].push(chatResponse);
      console.log("SESSIONS", sessions)
      res.status(200).json({ response: response });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "An error occurred." });
    }
  },

  MakeAction: async (req, res) => {
    const sessionID = req.body.sessionID;
    const action = req.body.action;
    
    if (!sessions[sessionID]) {
      return res.status(400).json({ error: 'Invalid session ID' });
    }
    
    const nextStep = {
      role: "user",
      content:
        action +
        ". Respond in JSON format like this example, where status is either 'Game Over', 'Game Won' or 'Continue': \n\n###\n\n {'setting':'setting description', 'actions':['action 1', 'action 2', 'action 3'], 'status': 'status'}\n\n###\n\n`,",
    };

    sessions[sessionID].push(nextStep);

    try {
      const response = await askGPT(sessions[sessionID]);
      const chatResponse = {
        role: "assistant",
        content: JSON.stringify(response),
      };
      sessions[sessionID].push(chatResponse);
      console.log("ACTION SESSION", sessions)
      res.status(200).json({ response: response });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "An error occurred." });
    }
  },
};

module.exports = GameController;
