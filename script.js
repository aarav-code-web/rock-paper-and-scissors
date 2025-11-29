console.log("Hello World");


function getComputerChoice() {
  const randomNum = Math.random();

  if (randomNum < 0.33) {
    return "rock";
  } else if (randomNum < 0.66) {
    return "paper";
  } else {
    return "scissors";
  }
}

function updateResults(message) {
  const resultsDiv = document.getElementById("results");
  resultsDiv.textContent = message;
}


function playGame() {
  let humanScore = 0;
  let computerScore = 0;

  
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
      updateResults(`You win! ${humanChoice} beats ${computerChoice}`);
      humanScore++;
    } else {
      updateResults(`You lose! ${computerChoice} beats ${humanChoice}`);
      computerScore++;
    }
  }

  window.playRound = playRound;

}

playGame();

document.getElementById("rock").addEventListener("click", () => {
  const computerChoice = getcomputerChoice();
  playRound("rock", computerChoice);
});

document.getElementById("paper").addEventListener("click", () => {
  const computerChoice = getcomputerChoice();
  playRound("paper", computerChoice);
});

document.getElementById("scissors").addEventListener("click", () => {
  const computerChoice = getcomputerChoice();
  playRound("scissors", computerChoice);
});
