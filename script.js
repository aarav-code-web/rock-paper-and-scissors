console.log("Hello World");

// Step 2: getComputerChoice
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

// Step 3: getHumanChoice
function getHumanChoice() {
  const choice = prompt("Enter rock, paper, or scissors:");
  return choice.toLowerCase();
}

// Step 6: playGame (contains everything else)
function playGame() {
  let humanScore = 0;
  let computerScore = 0;

  // Step 5: playRound inside playGame
  function playRound(humanChoice, computerChoice) {
    humanChoice = humanChoice.toLowerCase();

    if (humanChoice === computerChoice) {
      console.log(`Tie! You both chose ${humanChoice}`);
      return;
    }

    const humanWins =
      (humanChoice === "rock" && computerChoice === "scissors") ||
      (humanChoice === "paper" && computerChoice === "rock") ||
      (humanChoice === "scissors" && computerChoice === "paper");

    if (humanWins) {
      console.log(`You win! ${humanChoice} beats ${computerChoice}`);
      humanScore++;
    } else {
      console.log(`You lose! ${computerChoice} beats ${humanChoice}`);
      computerScore++;
    }
  }

  // Play 5 rounds
  for (let i = 1; i <= 5; i++) {
    console.log(`--- Round ${i} ---`);
    const humanSelection = getHumanChoice();
    const computerSelection = getComputerChoice();
    playRound(humanSelection, computerSelection);
  }

  // Final result
  console.log("=== Final Score ===");
  console.log(`Human: ${humanScore}, Computer: ${computerScore}`);

  if (humanScore > computerScore) {
    console.log("You win the game!");
  } else if (computerScore > humanScore) {
    console.log("Computer wins the game!");
  } else {
    console.log("The game is a tie!");
  }
}

// Start the game
playGame();
