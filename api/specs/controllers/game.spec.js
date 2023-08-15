const GameController = require("../../controllers/game");
const askGPT = require("../../controllers/apiClient");
jest.mock("../../controllers/apiClient");

describe("GameController", () => {
  test("startGame sends genre specific messages array to apiClient and returns a json response message", async () => {
    const mockResponse = {
      setting:
        "You find yourself in a dark and mysterious forest. The trees loom overhead, casting long shadows. The air is thick with the scent of moss and damp earth.",
      actions: [
        "Explore deeper into the forest.",
        "Look for a way out of the forest.",
        "Climb a tree to get a better view of your surroundings.",
      ],
    };
    askGPT.mockResolvedValue(mockResponse);
    const result = await GameController.StartGame("fantasy");
    expect(result).toEqual(mockResponse);
  });
});
// testing startGame function of GameController
// when given a genre,
