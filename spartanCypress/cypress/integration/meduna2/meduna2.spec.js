require("cypress-xpath");
import "cypress-iframe";
import "@4tw/cypress-drag-drop";
import "cypress-file-upload";
import { Given, And, Then } from "cypress-cucumber-preprocessor/steps";
///<reference types="cypress"/>

Given("user is on the login page and singup page", () => {
  Cypress.on("uncaught:exception", (err, runnable) => {
    return false;
  });
  cy.visit("https://medunna.com/login");
});
Given(
  "user sends username {string} and password {string}",
  (username, password) => {
    cy.get("#username").type(username);
    cy.get("#password").type(password);
    cy.xpath("//button[@class='btn btn-primary']").click();
  }
);

Then("user click administration and click on room management", () => {
  cy.get("#entity-menu").click({ force: true });
  cy.xpath("//li//a//span[.='Room']").click({ force: true });
});
Then("user click on add room", () => {
  cy.get("#jh-create-entity").click({ force: true });
});
When(
  "enter {string} {string} {string} {string}",
  (roomname, roomtype, roomprice, desp) => {
    cy.get("#room-roomNumber").type(roomname, { force: true });
    cy.get("#room-roomType").select(roomtype, { force: true });
    cy.get("#room-status").check({ force: true });
    cy.get("#room-price").type(roomprice, { force: true });
    cy.get("#room-description").type(desp, { force: true });
  }
);
let roomId;
let roomNum;
Then("user click on save", () => {
  cy.get("#save-entity").click({ force: true });
  cy.wait(4000);
  cy.xpath("//thead//tr//th[7]").click({ force: true });
  cy.wait(4000);
  cy.xpath("//tbody//tr[1]//td[1]").then(($td) => {
    roomId = $td.text();
  });

  cy.xpath("//tbody//tr[1]//td[2]").then(($td) => {
    roomNum = $td.text();
  });
});

// cy.xpath("//div[@role='alert']").should("contain","A new user is created")

Then("user should see the room created successfully", () => {
  cy.xpath("//div[@role='alert']").should("contain", "A new room is created");
});

Then("user sees this room in api and db", () => {
  var tkn;
  cy.request({
    method: "POST",
    url: "https://medunna.com/api/authenticate",
    body: {
      username: "admin79",
      password: "admin",
      rememberMe: true,
    },
  })
    .then((res) => {
      tkn = res.body.id_token;
    })
    .then(() => {
      cy.request({
        method: "GET",
        url: "https://medunna.com/api/rooms/" + roomId,
        headers: {
          Authorization: `Bearer ${tkn}`,
        },
      })
        .then((res) => {
            expect(res.body.roomNumber).to.equal(parseInt(roomNum));
        })
        .then(() => {
          cy.request({
            method: "delete",
            url: "https://medunna.com/api/rooms/" + roomId,
            headers: {
              Authorization: `Bearer ${tkn}`,
            },
          });
        });
    });
});
