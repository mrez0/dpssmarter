describe("Login", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("should show error message when all fields are empty", () => {
    cy.get(".login").click();
    cy.get(".q-dialog").contains("Please fill all login details");
  });

  it("should show error message when any field is empty", () => {
    cy.get(".dpsNumber").type("1234");
    cy.get(".login").click();
    cy.get(".q-dialog").contains("Please fill all login details");
  });

  it("should show error message when any field is empty", () => {
    cy.get(".password").type("1234");
    cy.get(".login").click();
    cy.get(".q-dialog").contains("Please fill all login details");
  });

  it("should show error message when login detail is wrong and no internet connection", () => {
    cy.server({ force404: true }); //  offline mode
    cy.get(".dpsNumber").type("xxxx");
    cy.get(".password").type("xxxx");
    cy.get(".login").click();
    cy.get(".q-loading").should("be.visible");
    cy.get(".q-dialog").contains(
      "Invalid login details. If new user, internet connection is required for login"
    );
    cy.get(".q-loading").should("not.visible");
  });

  it("should show error message when login detail is wrong", () => {
    cy.get(".dpsNumber").type("xxxx");
    cy.get(".password").type("xxxx");
    cy.get(".login").click();
    cy.get(".q-loading").should("be.visible");
    cy.get(".q-dialog").contains("Invalid login details");
    cy.get(".q-loading").should("not.visible");
  });

  it("should redirect to main when login success", () => {
    cy.get(".dpsNumber").type("1234");
    cy.get(".password").type("1234");
    cy.get(".login").click();
    cy.url().should("equal", "http://localhost:8080/main/");
  });

  it("should redirect to login when visiting any page when not logged in", () => {
    cy.visit("/main");
    cy.url().should("equal", "http://localhost:8080/login");
  });
});
