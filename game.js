class Game {
    constructor() {
        this.playerScore = 0;
        this.computerScore = 0;
        this.moves = 0;
        this.playerName = '';
        this.result = document.querySelector('.result');
        this.reloadBtn = document.querySelector('.reload');
        this.resetBtn = document.querySelector('.reset');
        this.playerScoreBoard = document.querySelector('.p-count');
        this.computerScoreBoard = document.querySelector('.c-count');
        this.movesLeft = document.querySelector('.movesleft');
        this.playerOptions = document.querySelectorAll('.choice');
        this.init();
    }

    init() {
        this.handleStartForm();
    }

    handleStartForm() {
        const startForm = document.getElementById('start-form');
        startForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const playerNameInput = document.getElementById('player-name');
            this.playerName = playerNameInput.value.trim();
            if (this.playerName) {
                localStorage.setItem('playerName', this.playerName);
                document.getElementById('player-setup').style.display = 'none';
                document.getElementById('game').style.display = 'block';
                this.updateMovesLeft();
                this.loadScores();
                this.attachGameEventListeners();
            } else {
                playerNameInput.setCustomValidity("Please enter your name.");
                playerNameInput.reportValidity();
            }
        });
    }

    attachGameEventListeners() {
        this.playerOptions.forEach(option => {
            option.addEventListener('click', (event) => this.playRound(event.target.innerText));
        });

        this.reloadBtn.addEventListener('click', () => window.location.reload());
        this.resetBtn.addEventListener('click', () => this.resetGame());
    }

    playRound(playerChoice) {
        this.moves++;
        this.updateMovesLeft();

        const computerChoice = this.getComputerChoice();
        setTimeout(() => this.determineWinner(playerChoice, computerChoice), 600);

        if (this.moves === 10) {
            setTimeout(() => this.gameOver(), 600);
        }
    }

    getComputerChoice() {
        const computerOptions = ['rock', 'paper', 'scissors'];
        return computerOptions[Math.floor(Math.random() * 3)];
    }

    determineWinner(player, computer) {
        player = player.toLowerCase();
        computer = computer.toLowerCase();
        if (player === computer) {
            this.result.textContent = 'It is a Tie';
        } else if ((player === 'rock' && computer === 'scissors') ||
                   (player === 'scissors' && computer === 'paper') ||
                   (player === 'paper' && computer === 'rock')) {
            this.result.textContent = 'You Won';
            this.playerScore++;
        } else {
            this.result.textContent = 'Computer Won';
            this.computerScore++;
        }
        this.updateScoreboard();
    }

    updateScoreboard() {
        this.playerScoreBoard.textContent = this.playerScore;
        this.computerScoreBoard.textContent = this.computerScore;

        localStorage.setItem('playerScore', this.playerScore);
        localStorage.setItem('computerScore', this.computerScore);
    }

    updateMovesLeft() {
        this.movesLeft.innerText = `${10 - this.moves}`;
    }

    loadScores() {
        this.playerScore = Number(localStorage.getItem('playerScore')) || 0;
        this.computerScore = Number(localStorage.getItem('computerScore')) || 0;
        this.updateScoreboard();
    }

    gameOver() {
        this.playerOptions.forEach(option => option.style.display = 'none');
        this.resetBtn.style.display = 'block';

        if (this.playerScore > this.computerScore) {
            this.result.textContent = 'Hooray! You Won The Game';
            this.result.style.color = 'blue';
        } else if (this.playerScore < this.computerScore) {
            this.result.textContent = 'Oop! Sorry. You Lost The Game';
            this.result.style.color = 'red';
        } else {
            this.result.textContent = 'Wow! No Winner. It was a Tie';
            this.result.style.color = 'grey';
        }
    }

    resetGame() {
        this.playerScore = 0;
        this.computerScore = 0;
        this.moves = 0;
        this.updateScoreboard();
        this.updateMovesLeft();
        this.showChoices();
    }

    showChoices() {
        this.playerOptions.forEach(option => option.style.display = 'inline-block');
        this.result.textContent = '';
        this.resetBtn.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Game();
});
