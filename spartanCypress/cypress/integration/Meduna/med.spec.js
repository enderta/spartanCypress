require("cypress-xpath");
import 'cypress-iframe';
import '@4tw/cypress-drag-drop'
import 'cypress-file-upload';
import { Given,And,Then } from "cypress-cucumber-preprocessor/steps";
///<reference types="cypress"/>

Given("user is on the login page and singup page",()=>{
    Cypress.on('uncaught:exception', (err, runnable) => {
        
        

        return false
      })
      cy.visit("https://medunna.com/login")
    
   

})
Given("user sends username {string} and password {string}",(username,password)=>{
cy.get("#username").type(username)
cy.get("#password").type(password)
cy.xpath("//button[@class='btn btn-primary']").click()
})

Then("verify the my page and logout",()=>{
    cy.xpath("(//li[@id='account-menu']//a//span)[1]").should("have.text","admin account")
    cy.xpath("(//li[@id='account-menu']//a//span)[1]").click()
    cy.xpath("(//li[@id='account-menu']//a//span)[4]").click()
    cy.xpath("//h2").should("have.text","Login","THANK YOU FOR CHOOSING US...")


})

Then("user click administration and click on user management",()=>{
    cy.xpath("//span[.='Administration']").click({force:true})
    cy.xpath("//span[.='User management']").click({force:true})

})

Then("user click on add user",()=>{
    cy.xpath("//span[.='Create a new user']").click({force:true})
})
let nameUI;
let firstnameUI;
When("enter {string} {string} {string} {string} {string}",
(log,firstname,lastname,email,ssn)=>{
cy.xpath("//input[@name='login']").type(log,{force:true})
cy.xpath("//input[@name='firstName']").type(firstname,{force:true})
cy.xpath("//input[@name='lastName']").type(lastname,{force:true})
cy.xpath("//input[@name='email']").type(email,{force:true})
cy.xpath("//input[@name='ssn']").type(ssn,{force:true})
cy.get("#authorities").select("ROLE_USER",{force:true})
nameUI=log;
firstnameUI=firstname;
})
Then("user click on save",()=>{
    cy.xpath("(//span[.='Save']//..)[1]").click({force:true})
})

Then("user should see the user created successfully",()=>{
    cy.xpath("//div[@role='alert']").should("contain","A new user is created")
})
Then("user sees this user in api and db",()=>{
    let id;
    cy.xpath("//span[.='Created date']").click({force:true})
    cy.xpath("//tbody//tr//td[2][.='"+nameUI+"']//..//td[1]").then((el)=>{
       id= el.text()
    })
    let tkn;
    cy.request({
        method:'POST',
        url:"https://medunna.com/api/authenticate",
        body:{
            username:"admin79",
            password:"admin",
            rememberMe:true
        }

    }).then((res)=>{
        tkn=res.body.id_token
    }).then(()=>{
        cy.request({
            method:'GET',
            qs:{
                page:281,
            },
            url:"https://medunna.com/api/users/",
            headers:{
                Authorization:"Bearer "+tkn
            }
        }).then((res)=>{
            let data=res.body;
           data.filter(x=>x.id===id).map(a=>a.firstName)
           expect(data.filter(x=>x.id===id).map(a=>a.firstName)).to.equal(firstnameUI)
        })
    })
})