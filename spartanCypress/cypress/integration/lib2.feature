Feature:API

Scenario: Checking dashboard datas
 Given the user is on the Library app login page
  When the user logs in as librarian
    When the user logs in as librarian to API
    Then the informations getting from API and UI should be matched
