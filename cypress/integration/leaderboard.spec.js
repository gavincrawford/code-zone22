
describe("Leaderboard", () => {
    it("should load", () => {
        cy.visit("localhost:3000/leaderboard");
    });
    it("should render the navbar and table", () => {
        cy.visit("localhost:3000/leaderboard");
        cy.get("span").contains("CODE_ZONE");
        cy.get("span").contains("leaderboard");
        cy.get("span").contains("problems");
        cy.get("th").contains("Name");
        cy.get("th").contains("Points");
    });
});
