let humanScore = 0;
let computerScore = 0;

// Make this global
function getComputerChoice() {
  const randomNum = Math.random();
  if (randomNum < 0.33) return "rock";
  else if (randomNum < 0.66) return "paper";
  else return "scissors";
}

// Update results div
function updateResults(message) {
  document.getElementById("results").textContent = message;
}

function playRound(humanChoice, computerChoice) {
  humanChoice = humanChoice.toLowerCase();

  if (humanChoice === computerChoice) {
    updateResults(`Tie! You both chose ${humanChoice}`);
    return;
  }

  const humanWins =
    (humanChoice === "rock" && computerChoice === "scissors") ||
    (humanChoice === "paper" && computerChoice === "rock") ||
    (humanChoice === "scissors" && computerChoice === "paper");

  if (humanWins) {
    humanScore++;
    updateResults(`You win! ${humanChoice} beats ${computerChoice} | Human: ${humanScore}, Computer: ${computerScore}`);
  } else {
    computerScore++;
    updateResults(`You lose! ${computerChoice} beats ${humanChoice} | Human: ${humanScore}, Computer: ${computerScore}`);
  }
}

// Buttons
document.getElementById("rock").addEventListener("click", () => {
  playRound("rock", getComputerChoice());
});
document.getElementById("paper").addEventListener("click", () => {
  playRound("paper", getComputerChoice());
});
document.getElementById("scissors").addEventListener("click", () => {
  playRound("scissors", getComputerChoice());
});
