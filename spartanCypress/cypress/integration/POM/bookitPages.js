require("cypress-xpath");
import "cypress-iframe";
import "@4tw/cypress-drag-drop";
import "cypress-file-upload";
///<reference types="cypress"/>
class Bookit{
login=(email,pass)=>{
    
cy.xpath("//input[@name='email']").type(email);
cy.xpath("//input[@name='password']").type(pass);
cy.xpath("//button[@type='submit']").click();
}
}

export default Bookit;