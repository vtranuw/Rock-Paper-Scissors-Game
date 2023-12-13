Rock-Paper-Scissors-Game
Final Project of JSCRIPT 310B

The game.js script uses a class-based approach to create an interactive Rock-Paper-Scissors game. It incorporates form handling, DOM manipulation, event listening, and basic game logic to provide a complete game experience. The game state is maintained within the class, and the DOM is updated based on the game's progress. The use of localStorage allows the game to remember the player's name and the current scores even if the page is reloaded.

Feature Description:

Class Structure: The JavaScript code defines a Game class that handles all the game logic. This class encapsulates properties like playerScore, computerScore, and moves, as well as methods for gameplay (playRound, determineWinner, updateScoreboard, updateMovesLeft, gameOver, resetGame, showChoices), ensuring a clear and maintainable structure.

Timing Functions: The playRound method utilizes setTimeout to introduce a delay between the player's choice and the computer's response, simulating the computer "thinking" before it reveals its choice. This delay is also used before executing the gameOver method to allow for the last move to be displayed before showing the game over screen.

Local Storage: The updateScoreboard method saves the player and computer scores to the browser's local storage.

Form Fields and Validation: Integrated at the beginning of the game for player name input.
