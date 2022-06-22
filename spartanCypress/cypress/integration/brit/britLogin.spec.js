require("cypress-xpath");
import 'cypress-iframe';
import '@4tw/cypress-drag-drop'
import 'cypress-file-upload';
import { Given,And,Then,When } from "cypress-cucumber-preprocessor/steps";
///<reference types="cypress"/>

Given("Manager on Invoicing Page",()=>{
    cy.visit("https://app.briteerp.com/web/login")
    cy.get("#login").type("Lunch_InvoicingManager2@info.com")
    cy.get("#password").type("LD686gfX23")
    cy.xpath("//*[@class='btn btn-primary']").click()
    cy.xpath("//ol//li[@class='active']").then((str)=>{
        expect(str.text()).equal("#Inbox")
    })
    cy.xpath("(//span[@class ='oe_menu_text'])[8]").click()
    cy.wait(3000)
})