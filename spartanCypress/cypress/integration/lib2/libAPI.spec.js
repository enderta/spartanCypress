require("cypress-xpath");
import 'cypress-iframe';
import '@4tw/cypress-drag-drop'
import 'cypress-file-upload';
import { Given,And,Then,When } from "cypress-cucumber-preprocessor/steps";
///<reference types="cypress"/>
let UIDAs,APIDas;
Given('the user is on the Library app login page',()=>{
cy.visit("https://library2.cybertekschool.com/login.html")
cy.get("#inputEmail").type("librarian570@library",{force:true})
cy.get("#inputPassword").type("2gCucjjn",{force:true})
cy.xpath("//button[@type='submit']").click()
})

When("the user logs in as librarian",()=>{
    let bookCount,users,borrowed;
    cy.wait(2000)
cy.xpath("//img[@id='user_avatar']//..//span").should("contain.text","Librarian")
cy.xpath("(//h2)[1]").then((str)=>{
    bookCount=Number(str.text())

})
cy.xpath("(//h2)[2]").then((str)=>{
    users=Number(str.text())

})
cy.xpath("(//h2)[3]").then((str)=>{
    borrowed=Number(str.text())

})
UIDAs=bookCount+users+borrowed;
})
When("the user logs in as librarian to API",()=>{
    let tkn ="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7ImlkIjoiODQ2IiwiZnVsbF9uYW1lIjoiVGVzdCBMaWJyYXJpYW4gNTcwIiwiZW1haWwiOiJsaWJyYXJpYW41NzBAbGlicmFyeSIsInVzZXJfZ3JvdXBfaWQiOiIyIn0sImlhdCI6MTY1MzgyOTE0MCwiZXhwIjoxNjU2NDIxMTQwfQ.j43Ohz1JHc97Nvd-iyQEIDLf_ULVVmYxyH6GByWwESM";
    cy.request({
      
            method:"GET",
            contentType:"application/json",
            url:"https://library2.cybertekschool.com/rest/v1/dashboard_stats",
            headers:{
          "x-library-token" :tkn
            }
        }).then(function(response){
           console.log(response.body)
        })
    })


Then("the informations getting from API and UI should be matched",()=>{
//cy.should(UIDAs===APIDas)
})