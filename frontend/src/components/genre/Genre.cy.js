import Homepage from "../homepage/Homepage"
const navigate = () => {}

describe("Genre", () => {
    it("Fantasy button mounts", () => {
        cy.mount(<Homepage navigate={navigate}/>);
        cy.get(".fantasy-btn").should("contain.text","Fantasy")
    })
})