
describe("Home", () => {
    it("should load", () => {
        cy.visit("localhost:3000");
    });
    it("should render the navbar and table", () => {
        cy.visit("localhost:3000");
        cy.get("span").contains("CODE_ZONE");
        cy.get("span").contains("leaderboard");
        cy.get("span").contains("problems");
        cy.get("th").contains("Name");
        cy.get("th").contains("Description");
        cy.get("th").contains("Difficulty");
        cy.get("th").contains("Points");
    });
});
