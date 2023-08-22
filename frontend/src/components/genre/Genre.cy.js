import Homepage from "../homepage/Homepage";
const navigate = () => {};
const setImgClass = () => {};
let genre = "";
let character = "";

describe("Genre", () => {
  it("Fantasy button mounts", () => {
    cy.mount(<Homepage navigate={navigate} />);
    cy.get(".genreimages").should("contain.text", "Fantasy");
  });
});

describe("Picking up genre component and actions", () => {
  it("User can pick a genre and then be able to pick a character", () => {
    cy.mount(<Homepage navigate={navigate} setImgClass={setImgClass} />);
    cy.contains("Fantasy").click();
    cy.get(".characterimages").should("contain.text", "Wizard");
  });

  it("User can pick a genre and character to progress", () => {
    cy.mount(<Homepage navigate={navigate} setImgClass={setImgClass} />);
    cy.intercept("POST", "**/genre", (req) => {
      req.body = { genre: genre, character: character };
      req.reply = {
        body: {
          response: {
            setting: "This is the setting mock",
            actions: ["", "", ""],
            status: "Game Over",
          },
        },
      };
    }).as("postGameStart");
    cy.contains("Fantasy").click();
    cy.contains("Bard").click();
    genre = "Fantasy Adventure";
    character = "Bard";
    cy.wait("@postGameStart");
    // cy.url().should("include", "action");
  });

  //   it("User can pick a genre Space to progress", () => {
  //     cy.intercept({
  //       method: "POST",
  //       url: "/genre",
  //     }).as("postGameStart");
  //     cy.mount(<Homepage navigate={navigate} />);
  //     cy.contains("Space").click();
  //     cy.wait("@postGameStart").its("request.body").should("deep.equal", {
  //       genre: "Space Horror",
  //     });
  //   });
});
