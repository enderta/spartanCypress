
  Feature: Rooms
    @bookITRooms
    Scenario Outline: Rooms info
    Given user logs in 'sbirdbj@fc2.com' 'asenorval'
    Given user is on the "<Rooms>" page
    Then user sees "<Rooms>" header
    Then User go to API "<Rooms>" page
    And API and UI rooms are the same name

    Examples:
      |Rooms|
      |amazon|
      |tesla|