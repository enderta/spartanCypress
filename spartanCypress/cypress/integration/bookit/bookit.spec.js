require("cypress-xpath");
import "cypress-iframe";
import "@4tw/cypress-drag-drop";
import Bookit from "../POM/bookitPages"; "cypress-file-upload";
import "../POM/bookitPages";
import { Given, And, Then } from "cypress-cucumber-preprocessor/steps";
///<reference types="cypress"/>
////cypress-tags run -e TAGS="@accessibility" --headed --browser=chrome
var bookit=new Bookit();
var fullNameUI
var tkn;
var fullNameApi;

Given("user logs in using {string} {string}", (username, password) => {
  cy.visit("https://cybertek-reservation-qa3.herokuapp.com/sign-in")
  cy.wait(8000)
  cy.xpath("//input[@name='email']").type(username);
  cy.xpath("//input[@name='password']").type(password);
  cy.xpath("//button[@type='submit']").click();
  
});
When("user is on the my self page", () => {
 
  cy.get('.navbar-brand > .button').click();
  cy.get('[routerlink="/me"]').click();

cy.
get('app-user-card > .card > .card-content > :nth-child(1) > .media-content > .title')
.then(function($element){
 // console.log($element.text())
 fullNameUI=$element.text();})

}); 




When("I logged Bookit api using {string} and {string}",(username, password) => {
cy.request({
  method:"GET",
  url:"https://cybertek-reservation-api-qa3.herokuapp.com/sign",
  qs:{
    email:username,
    password:password
  }
}).then(function(response){
  tkn=response.body.accessToken;
  console.log(tkn)
})
 
})

When("I get the current user information from api", () => {
  cy.request({
    method:"GET",
    url:"https://cybertek-reservation-api-qa3.herokuapp.com/api/users/me",
    headers:{
      Authorization:`Bearer ${tkn}`
    }
  }).then(function(response){
    fullNameApi=response.body.firstName+" "+response.body.lastName;
  })
console.log(fullNameUI);
});
