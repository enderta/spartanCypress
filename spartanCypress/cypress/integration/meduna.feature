Feature:admin should be login


  Scenario Outline:login_with_employee_credentials
    Given user is on the login page and singup page
    And user sends username "<username>" and password "<password>"
    Then verify the my page and logout

    Examples: Credential
      | username     | password |
      | adminaccount | 12345    |

 Scenario Outline: :Creating user
    Given user is on the login page and singup page
    And user sends username "adminaccount" and password "12345"
    Then user click administration and click on user management
    And user click on add user
    When enter "<Login>" "<firstname>" "<lastname>" "<email>" "<ssn>"
    Then user click on save
    Then user should see the user created successfully
    Then user sees this user in api and db
    Examples:
      | Login | firstname | lastname | email          | ssn         |
      | asfg11  | dsfg      | ksfg     | ksfg11@gmail.com | 515-55-9898 |  

