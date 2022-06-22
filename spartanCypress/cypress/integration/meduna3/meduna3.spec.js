require("cypress-xpath");
import "cypress-iframe";
import "@4tw/cypress-drag-drop";
import "cypress-file-upload";
import { Given, And, Then } from "cypress-cucumber-preprocessor/steps";
///<reference types="cypress"/>
let tkn;
let countryId;
Given("user create country in API",()=>{
cy.request({
    method: "POST",
    url: "https://medunna.com/api/authenticate",
    body: {
      username: "admin79",
      password: "admin",
      rememberMe: true,
    },
}).then((res)=>{
    tkn = res.body.id_token;
    expect(res.status).to.equal(200);
}).then(()=>{
    cy.request({
        method: "POST",
        url: "https://medunna.com/api/countries",
        headers: {
          Authorization: `Bearer ${tkn}`,
        },
        body: {name:"test"}
    }).then((res)=>{
        countryId = res.body.id;
        expect(res.status).to.equal(201);
    }
    )}
    )
    cy.wait(4000);
})
Given("user is on the login page and singup page",()=>{
    Cypress.on("uncaught:exception", (err, runnable) => {
        return false;
      });
      cy.visit("https://medunna.com/login");
})
Given("user sends username {string} and password {string}",(username,password)=>{
    cy.get("#username").type(username);
    cy.get("#password").type(password);
    cy.xpath("//button[@class='btn btn-primary']").click();
})
Then("user click administration and click on country management",()=>{
    cy.get("#entity-menu").click({ force: true });
    cy.xpath("//li//a//span[.='Country']").click({ force: true });
})
Then("the user should see the country created in the API on the list",()=>{
    cy.xpath("//tbody//tr//td[1]").should("contain",countryId);
   cy.request({
         method: "delete",
            url: "https://medunna.com/api/countries/"+countryId,
            headers: {
                Authorization: `Bearer ${tkn}`,
            },
        }).then((res)=>{
            expect(res.status).to.eq(204);
   })

})