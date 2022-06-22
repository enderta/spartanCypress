Feature: Bookit
  @book
  Scenario Outline: three point verification (UI,DATABASE,API)
    Given user logs in using "<email>" "<password>"
    When user is on the my self page
    And I logged Bookit api using "<email>" and "<password>"
    And I get the current user information from api
   

    Examples:
      | email                | password     |
      | sbirdbj@fc2.com      | asenorval    |

      