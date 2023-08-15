const askGPT = require("../../controllers/apiClient");

describe("askGPT", () => {
  it.skip("initially returns a json response containing a setting and array of 3 actions", async () => {
    const response = await askGPT([
      {
        role: "system",
        content:
          "I want you to play like a classic text adventure game. I will be the protagonist and main player. Don’t refer to yourself. The setting of this game will have a theme of fantasy." +
          "Each setting has a description of 150 characters followed by an array of 3 possible actions that the player can perform." +
          "A game should end after 10 turns with a successful outcome if I have not selected a game ending action." +
          "Have the adventure follow a set path. The success of the adventure is determined by the choices the player makes." +
          "One of these actions is fatal and ends the game. Never add other explanations. Don/’t refer to yourself." +
          "Your responses are just in JSON format like this example: \n\n###\n\n {“setting”:”setting description”, “actions”:[“action 1”, “action 2”, “action 3”]}\n\n###\n\n",
      },
    ]);
    expect(typeof response.setting).toBe("string");
    expect(response.actions.length).toBe(3);
  }, 10000);
});
