
require("cypress-xpath");
import 'cypress-iframe';
import '@4tw/cypress-drag-drop'
import 'cypress-file-upload';
import { Given,And,Then,When } from "cypress-cucumber-preprocessor/steps";
///<reference types="cypress"/>

let nameAPI="";
Given("the user as a librarian makes post request with using add_book end point with random values",()=>{
cy.request({
    method:"POST",
    url:"https://library2.cybertekschool.com/rest/v1/add_book",
    headers:{
        "Content-Type":"application/json",
        "x-library-token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7ImlkIjoiODQ2IiwiZnVsbF9uYW1lIjoiVGVzdCBMaWJyYXJpYW4gNTcwIiwiZW1haWwiOiJsaWJyYXJpYW41NzBAbGlicmFyeSIsInVzZXJfZ3JvdXBfaWQiOiIyIn0sImlhdCI6MTY1MzgyOTE0MCwiZXhwIjoxNjU2NDIxMTQwfQ.j43Ohz1JHc97Nvd-iyQEIDLf_ULVVmYxyH6GByWwESM"
    },
    body:{
        "name":"Test Book Java",
        "isbn":123456789,
        "author":"Test Author",
        "year":2022,
        "description":"Test Description",
        "book_category_id":1

    }
   
}).then((response)=>{
   
  expect(response.body.message).to.equal("The book has been created.")
})
nameAPI="Test Book Java"
})
Given("the user navigates to {string} page",((str)=>{
cy.xpath("//span[@class='title'][.='"+str+"']").click()

}))

Given("the user search corresponding book name",()=>{
cy.xpath("//input[@type='search']").type(nameAPI)


})
When('the user logs in as librarian',()=>{
    cy.visit("https://library2.cybertekschool.com/login.html")
    cy.get("#inputEmail").type("librarian570@library",{force:true})
    cy.get("#inputPassword").type("2gCucjjn",{force:true})
    cy.xpath("//button[@type='submit']").click()
    })
Then("the user should see the book created in the API on the list",()=>{
    cy.xpath("//tbody//tr[1]//td[3]").should("contain.text",nameAPI)
})
Then("the user click edit button",()=>{
cy.xpath("//tbody/tr[1]/td[1]").click()
cy.xpath("//button[.='Save changes']").click()
})
Then("click save button see the msg {string}",((str)=>{
    cy.xpath("//div[@class='toast-message']").should("contain.text",str)

}))
