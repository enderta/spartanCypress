require("cypress-xpath");
import 'cypress-iframe';
import '@4tw/cypress-drag-drop'
import 'cypress-file-upload';
import { Given,And,Then } from "cypress-cucumber-preprocessor/steps";
///<reference types="cypress"/>
var name2="";
Given('on the spartan page', () => {
    cy.visit("http://3.93.193.109:8000/spartans");

})
When('I click on the add button',()=>{
   cy.get("#add_spartan_btn").click();
})
Then("I fill in the form with {string}, {string}, {string}",(name,gender,phone)=>{
name2=name;
cy.xpath("//input[@name='name']").type(name);
cy.get("#genderSelect").select(gender);
cy.get("#phone").type(phone);
cy.get("#submit_btn").click()
cy.get('.alert').should("contain.text","Successfully Added new Data!")

})
Then("I should see same person API and Database",()=>{
cy.request({
    method:"GET",
    url:"http://3.93.193.109:8000/api/spartans",
  
}).then(function(response){
    var data=response.body;
    var name3=data[data.length-1].name;
   
expect(name2).to.equal(name3);
})

})
////cypress-tags run -e TAGS="@accessibility" --headed --browser=chrome