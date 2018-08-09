# Tic Tac Toe

## Rules

- Each player takes their turn until a winner or all board spaces are filled
- Three across in any direction is a winner

## Evaluation Criteria

1. Data Model: How is the board represented? How are moves recorded? Whose turn is it?

2. Win Checks: Data model and win checks together are the algorithm/traditional CS component of the test.
    1. Are all wins successfully checked?
    2. Are there tests to prove it?

3. CSS/HTML: Does the board look like a 3x3 grid? Could it easily become nxn?
    1. This is the least important section.

4. Integration:
    1. What's the flow-control strategy for the execution / design of the code as a whole?
    2. Are lifecycle methods used correctly?
    3. What happens when there's a cat's game / draw?

5. UX:
    1. Can I play on an already-played space?
    2. Is it clear when there's a winner?
    3. Is it clear who won?
    4. Can I reset the board to play again?
    5. Does it "look" like tic tac toe?

## Features

### MVP

- CORE: Determine the winner
  - [ ] across
  - [ ] down
  - [ ] diagonal

- CORE: gameplay
  - [ ] prevent changing a played space

- GAME: header
  - [ ] current player's turn

- GAME: board
  - [ ] modal over board w/ "Player X Wins" or "Tie Game!"
      - [ ] and start next game

- GAME: controls
  - [ ] start new game

- TEST Gameplay
  - [ ] determineWinner
  - [ ] determineTie

### ADDONs

- GAME: core
  - [ ] winner not possible (even if spaces are available)

- GAME: controls
  - [ ] toggle renderMatchHistoryTable()

- GAME: configuration
  - [ ] connect 4
  - [ ] connect N

- GAME: match history table
  - [ ] add scores for P1 & P2 to the Header
  - [ ] Use apollo cache to keep the score
  - [ ] list the winner of each game (from the cache)
      - [ ]  and time-ago
      - [ ]  and consecutive wins

- STYLE
  - [ ] Keep board size symmetrical [ref](https://jsfiddle.net/kwgum8yL/)
  - [ ] Center board on the page

- GAME: settings
  - [ ] Players can choose name
  - [ ] Players can choose marker

- TEST Rendering
  - [ ] NewGameState
  - [ ] Turn 1 State
  - [ ] Turn 2 State
  - [ ] Turn 5 State
  - [ ] Tie Game State causes Tie Game UI
  - [ ] Completed Game State causes Completed Game UI
  - [ ] History of Games
