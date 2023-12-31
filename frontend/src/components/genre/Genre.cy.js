import Homepage from "../homepage/Homepage";
const navigate = () => {};
const setImgClass = () => {};

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

  it("User can pick a genre and a character to progress", () => {
    cy.mount(<Homepage navigate={navigate} setImgClass={setImgClass} />);
    cy.contains("Fantasy").should("be.visible").click();
    cy.contains("Sorceress").should("be.visible");
  });
});
