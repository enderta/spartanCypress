require("cypress-xpath");
import "cypress-iframe";
import "@4tw/cypress-drag-drop";
import "cypress-file-upload";
import { Given, And, Then } from "cypress-cucumber-preprocessor/steps";
///<reference types="cypress"/>

describe("actions", () => {
  it.skip("mouse over", () => {
    cy.visit("http://practice.cybertekschool.com/hovers");
    cy.xpath("(//*[@class='figure'])[1]").trigger("mouseover");
    cy.should("contain", "name: user1");
    cy.xpath("(//*[@class='figure'])[1]//a").then(function($element) {
      $element.trigger("mouseover", { force: true });
    });
  });
  it.skip("right click", () => {
    let x = "";
    cy.visit("https://the-internet.herokuapp.com/context_menu");
    cy.get("#hot-spot").rightclick();
    cy.on("window:alert", (str) => {
      x = str;
    });
    console.log(x + "ender");
  });
  it.skip("iframe", () => {
    cy.visit("http://practice.cybertekschool.com/iframe");
    cy.frameLoaded("#mce_0_ifr");
    cy.iframe()
      .find("p")
      .clear();
    cy.iframe()
      .find("p")
      .type("Hello");
  });
  let tkn = "";
  it.skip("request", () => {
    cy.request({
      method: "GET",
      url: "https://cybertek-reservation-api-qa3.herokuapp.com/sign",
      qs: {
        email: "sbirdbj@fc2.com",
        password: "asenorval",
      },
    }).then(function(response) {
      tkn = response.body.accessToken;
      console.log(tkn);
    }).then(function() {
      cy.request({
        method: "GET",
        url: "https://cybertek-reservation-api-qa3.herokuapp.com/api/users",
        headers: {
          Authorization: `Bearer ${tkn}`,
        },
      }).then(function(response) {
     let x= response.body.filter((u)=>u.id).find((u)=>u.id===250)
      });
    });
  });
  it.skip("alert",()=>{
    cy.visit("http://practice.cybertekschool.com/javascript_alerts")
    cy.xpath("//button[.='Click for JS Prompt']").click()
    cy.on("window:alert",(str)=>{
     window.prompt(text,"ender")
  })})
  it.skip('window prompt test', function () {
    cy.visit('http://practice.cybertekschool.com/javascript_alerts', {
      onBeforeLoad(win) {
        cy.stub(win, 'prompt').returns('ender')
        //cy.stub(win, 'alert').as('windowAlert')
      }
    })
    
    cy.xpath("//button[.='Click for JS Prompt']").click().then(function () {
     cy.get("#result").should('contain','ender')
    })
  })
  it("prompt",()=>{
    cy.visit("http://practice.cybertekschool.com/javascript_alerts")
    cy.window().then(($windowElement)=>{
      cy.stub($windowElement,'prompt').returns('ender')
    })
    cy.xpath("//button[.='Click for JS Prompt']").click()
    cy.get("#result").should("contain","ender")
    cy.get("#result").then((str)=>{
      expect(str.text()).to.equal("You entered: ender")
      console.log(str.text)
    })
  
  })
 
  
}) 
