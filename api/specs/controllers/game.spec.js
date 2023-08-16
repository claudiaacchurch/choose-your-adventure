const GameController = require("../../controllers/game");
const askGPT = require("../../controllers/apiClient");
const app = require("../../app")
jest.mock("../../controllers/apiClient");
const request = require("supertest");

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
    // const result = await GameController.StartGame("fantasy");
    let response = await request(app)
      .post("/genre")
      .send({genre: "fantasy"})
    expect(JSON.parse(response.text).response).toEqual(mockResponse);
  });

  test("MakeAction selects an action and sends it to api client as the user and returns three more choices", async () => {
    const mockResponse1 = {
      setting:
        "You are in a dark hallway",
      actions: [
        "Turn left.",
        "Turn right.",
        "Go outside.",
      ],
    };
    const action = "Explore deeper into the forest."
    askGPT.mockResolvedValue(mockResponse1); 
    const secondResult = await GameController.MakeAction({body: {action: action}});
    expect(secondResult).toEqual(mockResponse1)
  })
});

