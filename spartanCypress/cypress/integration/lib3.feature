Feature:Post book
 @lib
  Scenario: Add book as a librarian on api
    Given the user as a librarian makes post request with using add_book end point with random values

    When the user logs in as librarian
    And the user navigates to "Books" page
    And the user search corresponding book name
    Then the user should see the book created in the API on the list
    And the user click edit button
    Then click save button see the msg "The book has been updated."