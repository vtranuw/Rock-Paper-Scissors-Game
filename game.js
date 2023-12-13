// The Game class is the core of the script and contains all the methods and properties needed to run the game.
class Game {
  constructor() {
    this.playerScore = 0;
    this.computerScore = 0;
    this.moves = 0;
    this.playerName = "";
    this.result = document.querySelector(".result");
    this.resetBtn = document.querySelector(".reset");
    this.playerScoreBoard = document.querySelector(".p-count");
    this.computerScoreBoard = document.querySelector(".c-count");
    this.movesLeft = document.querySelector(".movesleft");
    this.playerOptions = document.querySelectorAll(".choice");
    this.init();
  }

  init() {
    // This init method will call handleStartForm to set up the form used for entering the player's name.
    this.handleStartForm();
  }

  // handleStartForm Method
  // Adds an event listener to the start form to handle the submit event.
  // When the form is submitted, it checks if the player's name is entered.
  // If so, it stores the name in localStorage, hides the setup form, shows the game interface, and initializes the game's state and event listeners.
  // If the player's name is not entered, it shows a validation message.
  handleStartForm() {
    const startForm = document.getElementById("start-form");
    startForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const playerNameInput = document.getElementById("player-name");
      this.playerName = playerNameInput.value.trim();
      if (this.playerName) {
        localStorage.setItem("playerName", this.playerName);
        document.getElementById("player-setup").style.display = "none";
        document.getElementById("game").style.display = "block";
        this.updateMovesLeft();
        this.loadScores();
        this.attachGameEventListeners();
      } else {
        playerNameInput.setCustomValidity("Please enter your name.");
        playerNameInput.reportValidity();
      }
    });
  }

  // attachGameEventListeners Method
  // Attaches event listeners to the game's choice buttons (rock, paper, scissor), the reset button.
  // The choice buttons have event listeners that trigger playRound when clicked.
  // The reset button calls resetGame to reset the game's state.
  attachGameEventListeners() {
    this.playerOptions.forEach((option) => {
      option.addEventListener("click", (event) =>
        this.playRound(event.target.innerText)
      );
    });

    this.resetBtn.addEventListener("click", () => {
      this.resetGame();
      window.location.reload();
    });
  }

  // playRound Method
  // Increments the moves counter and updates the display of moves left.
  // Generates a computer choice and then, after a delay (to simulate thinking time), determines the winner of the round.
  // Checks if the maximum number of moves has been reached and, if so, ends the game.
  playRound(playerChoice) {
    this.moves++;
    this.updateMovesLeft();

    const computerChoice = this.getComputerChoice();
    console.log("Computer's choice:", computerChoice); // Log computer's choice to console to see computer's choice
    setTimeout(() => this.determineWinner(playerChoice, computerChoice), 600);

    if (this.moves === 10) {
      setTimeout(() => this.gameOver(), 600);
    }
  }

  // getComputerChoice Method
  // 'rock', 'paper', and 'scissors' is randomly selected to simulate the computer's choice.
  getComputerChoice() {
    const computerOptions = ["rock", "paper", "scissors"];
    return computerOptions[Math.floor(Math.random() * 3)];
  }

  // determineWinner Method
  // Compares the player's choice and the computer's choice to determine the winner of the round.
  // Updates the scores accordingly and updates the scoreboard display.
  determineWinner(player, computer) {
    player = player.toLowerCase();
    computer = computer.toLowerCase();
    if (player === computer) {
      this.result.textContent = "It is a Tie";
    } else if (
      (player === "rock" && computer === "scissors") ||
      (player === "scissors" && computer === "paper") ||
      (player === "paper" && computer === "rock")
    ) {
      this.result.textContent = "You Won";
      this.playerScore++;
    } else {
      this.result.textContent = "Computer Won";
      this.computerScore++;
    }
    this.updateScoreboard();
  }

  // updateScoreboard Method
  // Updates the scoreboard display with the current scores.
  // Stores the scores in localStorage.
  updateScoreboard() {
    this.playerScoreBoard.textContent = this.playerScore;
    this.computerScoreBoard.textContent = this.computerScore;

    localStorage.setItem("playerScore", this.playerScore);
    localStorage.setItem("computerScore", this.computerScore);
  }

  // updateMovesLeft Method
  // Updates the display of how many moves are left in the game.
  updateMovesLeft() {
    this.movesLeft.innerText = `${10 - this.moves}`;
  }

  // loadScores Method
  // Loads the scores from localStorage if they exist.
  loadScores() {
    this.playerScore = Number(localStorage.getItem("playerScore")) || 0;
    this.computerScore = Number(localStorage.getItem("computerScore")) || 0;
    this.updateScoreboard();
  }

  // gameOver Method
  // Hides the choice buttons and shows the reset button.
  // Displays the game result: who is a the winner or No winner (if it was a tie).
  gameOver() {
    this.playerOptions.forEach((option) => (option.style.display = "none"));
    this.resetBtn.style.display = "block";

    if (this.playerScore > this.computerScore) {
      this.result.textContent = "Hooray! You Won The Game";
      this.result.style.color = "blue";
    } else if (this.playerScore < this.computerScore) {
      this.result.textContent = "Oop! Sorry. You Lost The Game";
      this.result.style.color = "red";
    } else {
      this.result.textContent = "Wow! No Winner. It was a Tie";
      this.result.style.color = "grey";
    }
  }

  // resetGame Method
  // Resets the game's state to the initial values.
  // Updates the scoreboard and moves left displays.
  // Shows the choice buttons and hides the result and reset button.
  resetGame() {
    this.playerScore = 0;
    this.computerScore = 0;
    this.moves = 0;
    this.updateScoreboard();
    this.updateMovesLeft();
    this.showChoices();
  }

  // showChoices Method
  // Shows the choice buttons and resets the result text.
  // Hides the reset button.
  showChoices() {
    this.playerOptions.forEach(
      (option) => (option.style.display = "inline-block")
    );
    this.result.textContent = "";
    this.resetBtn.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new Game();
});
