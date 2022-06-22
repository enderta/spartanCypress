Feature: Country
Scenario: Country creation
        Given user create country in API
        Given user is on the login page and singup page
        And user sends username "adminaccount" and password "12345"
        Then user click administration and click on country management
        And the user should see the country created in the API on the list