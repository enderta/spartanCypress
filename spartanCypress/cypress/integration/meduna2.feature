Feature: Meduna2
@meduna
Scenario Outline: Room creation
    Given user is on the login page and singup page
    And user sends username "adminaccount" and password "12345"
    Then user click administration and click on room management
    And user click on add room
    When enter "<roomnumber>" "<roomtype>" "<roomprice>" "<roomdescription>"
    Then user click on save
    Then user sees this room in api and db
    Examples:
      | roomnumber | roomtype | roomprice | roomdescription |
      | 80006      | TWIN     | 100       | with TV         |

