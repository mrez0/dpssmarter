describe("Department", () => {
  before(() => {
    cy.visit("/login");
    cy.get(".dpsNumber").type("1234");
    cy.get(".password").type("1234");
    cy.get(".login").click();
    cy.get(".departments-link").click();
    cy.location("pathname", { timeout: 10000 }).should(
      "include",
      "/department"
    );
  });

  it("should show add dialog when click on Add", () => {
    cy.get("#addBtn").click();
    cy.get(".q-dialog").should("be.visible");
    cy.get("#cancelBtn").click();
  });
  it("should show 2 added items in the table when added", () => {
    cy.get("#addBtn").click();
    cy.get(".departmentNameInput").type("test 1");
    cy.get("#saveBtn").click();
    cy.wait(1000);
    cy.contains("test 1");
    cy.get("#addBtn").click();
    cy.get(".departmentNameInput").type("test 2");
    cy.get("#saveBtn").click();
    cy.wait(1000);
    cy.contains("test 2");
  });
  it("should disable the edit button when not only one item is selected", () => {
    cy.get("#editBtn").should("be.disabled");
    cy.get(".q-checkbox__native ")
      .eq(1)
      .click({ force: true });
    cy.get("#editBtn").should("not.be.disabled");

    cy.get(".q-checkbox__native ")
      .eq(2)
      .click({ force: true });
    cy.get("#editBtn").should("be.disabled");

    cy.get(".q-checkbox__native ")
      .eq(1)
      .click({ force: true });
    cy.get(".q-checkbox__native ")
      .eq(2)
      .click({ force: true });
  });
  it("should disable the delete button when any item is not selected", () => {
    cy.get("#deleteBtn").should("be.disabled");
    cy.get(".q-checkbox__native ")
      .eq(1)
      .click({ force: true });
    cy.get("#deleteBtn").should("not.be.disabled");

    cy.get(".q-checkbox__native ")
      .eq(2)
      .click({ force: true });
    cy.get("#deleteBtn").should("not.be.disabled");

    cy.get(".q-checkbox__native ")
      .eq(1)
      .click({ force: true });
    cy.get(".q-checkbox__native ")
      .eq(2)
      .click({ force: true });
  });
  it("should show the updated item in table when edited", () => {
    cy.get(".q-checkbox__native ")
      .eq(-1)
      .click({ force: true });
    cy.get("#editBtn").click();
    cy.get(".departmentNameInput").type("34");
    cy.get("#saveBtn").click();
    cy.wait(1000);
    cy.contains("test 234");
  });
  it("should select all checkboxes in the table when select all is selected", () => {
    cy.get(".q-checkbox__native ")
      .eq(0)
      .click({ force: true });
    cy.get(".q-checkbox").each(checkbox => {
      cy.wrap(checkbox)
        .attribute("aria-checked")
        .should("contain", "true");
    });
  });
  it("should unselect all checkboxes in the table when select all is unselected", () => {
    cy.get(".q-checkbox__native ")
      .eq(0)
      .click({ force: true });
    cy.get(".q-checkbox").each(checkbox => {
      cy.wrap(checkbox)
        .attribute("aria-checked")
        .should("contain", "false");
    });
  });
  it("should remove the item from table when deleted", () => {
    cy.get(".q-checkbox__native ")
      .eq(-1)
      .click({ force: true });
    cy.get(".q-checkbox__native ")
      .eq(-2)
      .click({ force: true });
    cy.get("#deleteBtn").click();
    cy.contains("test 1").should("not.exist");
    cy.contains("test 234").should("not.exist");
  });
});
