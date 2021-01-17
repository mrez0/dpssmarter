describe("Main", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.get(".dpsNumber").type("1234");
    cy.get(".password").type("1234");
    cy.get(".login").click();
    cy.location("pathname", { timeout: 10000 }).should("include", "/main");
  });

  it("should show confirm dialog before closing App", () => {
    cy.get(".closeBtn").click();
    cy.get(".q-dialog").contains("Are you sure to exit?");
  });

  // @TODO Make tests for search bar
  // @TODO Make tests for notifications
  // @TODO Make tests for change password
});
