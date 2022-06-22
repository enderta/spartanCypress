require("cypress-xpath");
import { Given, And, Then } from "cypress-cucumber-preprocessor/steps";
///<reference types="cypress"/>
////cypress-tags run -e TAGS="@accessibility" --headed --browser=chrome
let roomNameUI, tkn, roomNameApi;

Given('user logs in {strings} {string}',(username, password) => {
cy.visit("https://cybertek-reservation-qa3.herokuapp.com/sign-in")
cy.wait(8000)
cy.xpath("//input[@name='email']").type(username);
cy.xpath("//input[@name='password']").type(password);
cy.xpath("//button[@type='submit']").click();
})
Given("user is on the {string} page",(page) => {
    cy.xpath("//a[.='"+room+"']").click();
})
Then(" user sees {string} header",(room)=>{
    cy.xpath("//h2").then((str)=>{
        roomNameUI=str.text();
        console.log(roomNameUI)
    })
})
Then(" User go to API {string} page",(room)=>{
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
    }).then(()=>{
        cy.request({
            method:"GET",
            url:"https://cybertek-reservation-api-qa3.herokuapp.com/api/rooms/"+room,
            headers:{
                Authorization:`Bearer ${tkn}`
            }
        }).then(function(response){
            roomNameApi=response.body.name;
            console.log(roomNameApi)
        })
    })
})
And("API and UI rooms are the same name",()=>{
    expect(roomNameUI).to.equal(roomNameApi)
})