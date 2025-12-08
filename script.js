// Game state
let humanScore = 0;
let computerScore = 0;
let totalGames = 0;
let totalWins = 0;
let totalLosses = 0;
let totalTies = 0;
let gameHistory = [];
let gameMode = 'infinite';
let maxRounds = null;

// Choice icons mapping
const choiceIcons = {
  rock: '✊',
  paper: '✋',
  scissors: '✌️'
};

// Get computer's random choice
function getComputerChoice() {
  const choices = ['rock', 'paper', 'scissors'];
  const randomIndex = Math.floor(Math.random() * 3);
  return choices[randomIndex];
}

// Update choice display
function updateChoiceDisplay(humanChoice, computerChoice) {
  const humanChoiceEl = document.getElementById('human-choice');
  const computerChoiceEl = document.getElementById('computer-choice');
  
  humanChoiceEl.textContent = choiceIcons[humanChoice];
  computerChoiceEl.textContent = choiceIcons[computerChoice];
  
  // Add animation
  humanChoiceEl.classList.add('active');
  computerChoiceEl.classList.add('active');
  
  setTimeout(() => {
    humanChoiceEl.classList.remove('active');
    computerChoiceEl.classList.remove('active');
  }, 500);
}

// Update scoreboard
function updateScoreboard() {
  document.getElementById('human-score').textContent = humanScore;
  document.getElementById('computer-score').textContent = computerScore;
}

// Update statistics
function updateStats() {
  document.getElementById('total-games').textContent = totalGames;
  document.getElementById('total-wins').textContent = totalWins;
  document.getElementById('total-losses').textContent = totalLosses;
  document.getElementById('total-ties').textContent = totalTies;
  
  const winRate = totalGames > 0 ? ((totalWins / totalGames) * 100).toFixed(1) : 0;
  document.getElementById('win-rate').textContent = winRate + '%';
}

// Add to history
function addToHistory(humanChoice, computerChoice, result) {
  const historyItem = {
    human: humanChoice,
    computer: computerChoice,
    result: result,
    time: new Date().toLocaleTimeString()
  };
  
  gameHistory.unshift(historyItem);
  
  // Keep only last 10 items
  if (gameHistory.length > 10) {
    gameHistory.pop();
  }
  
  updateHistoryDisplay();
}

// Update history display
function updateHistoryDisplay() {
  const historyList = document.getElementById('history-list');
  
  if (gameHistory.length === 0) {
    historyList.innerHTML = '<p class="no-history">No games played yet</p>';
    return;
  }
  
  historyList.innerHTML = gameHistory.map(item => {
    const resultClass = item.result === 'win' ? 'win' : item.result === 'lose' ? 'lose' : 'tie';
    const resultText = item.result === 'win' ? '🎉 Won' : item.result === 'lose' ? '😞 Lost' : '🤝 Tie';
    
    return `
      <div class="history-item ${resultClass}">
        <span>${choiceIcons[item.human]} vs ${choiceIcons[item.computer]}</span>
        <span>${resultText}</span>
        <span>${item.time}</span>
      </div>
    `;
  }).join('');
}

// Display result message
function displayResult(message, resultType) {
  const resultEl = document.getElementById('result-message');
  resultEl.textContent = message;
  resultEl.className = 'result-message ' + resultType;
}

// Check if game is over
function checkGameOver() {
  if (gameMode === 'infinite') return false;
  
  const targetWins = Math.ceil(maxRounds / 2);
  
  if (humanScore === targetWins) {
    showWinnerModal('🎉 Congratulations! You Won the Match!', `Final Score: You ${humanScore} - ${computerScore} Computer`);
    return true;
  } else if (computerScore === targetWins) {
    showWinnerModal('😞 Game Over! Computer Won the Match!', `Final Score: You ${humanScore} - ${computerScore} Computer`);
    return true;
  }
  
  return false;
}

// Show winner modal
function showWinnerModal(title, message) {
  // Disable game buttons
  disableGameButtons(true);
  
  // Show modal
  const modal = document.createElement('div');
  modal.className = 'modal show';
  modal.innerHTML = `
    <div class="modal-content">
      <h2>${title}</h2>
      <p>${message}</p>
      <button onclick="resetGame()">Play Again</button>
    </div>
  `;
  document.body.appendChild(modal);
}

// Disable/enable game buttons
function disableGameButtons(disabled) {
  document.getElementById('rock').disabled = disabled;
  document.getElementById('paper').disabled = disabled;
  document.getElementById('scissors').disabled = disabled;
}

// Play a round
function playRound(humanChoice) {
  const computerChoice = getComputerChoice();
  
  // Update display
  updateChoiceDisplay(humanChoice, computerChoice);
  
  totalGames++;
  
  // Determine winner
  if (humanChoice === computerChoice) {
    totalTies++;
    displayResult(`It's a tie! Both chose ${humanChoice}`, 'tie');
    addToHistory(humanChoice, computerChoice, 'tie');
  } else {
    const humanWins =
      (humanChoice === 'rock' && computerChoice === 'scissors') ||
      (humanChoice === 'paper' && computerChoice === 'rock') ||
      (humanChoice === 'scissors' && computerChoice === 'paper');
    
    if (humanWins) {
      humanScore++;
      totalWins++;
      displayResult(`You win! ${humanChoice} beats ${computerChoice}`, 'win');
      addToHistory(humanChoice, computerChoice, 'win');
    } else {
      computerScore++;
      totalLosses++;
      displayResult(`You lose! ${computerChoice} beats ${humanChoice}`, 'lose');
      addToHistory(humanChoice, computerChoice, 'lose');
    }
  }
  
  updateScoreboard();
  updateStats();
  
  // Check if game is over
  checkGameOver();
}

// Reset game
function resetGame() {
  humanScore = 0;
  computerScore = 0;
  
  updateScoreboard();
  
  // Reset choice display
  document.getElementById('human-choice').textContent = '?';
  document.getElementById('computer-choice').textContent = '?';
  document.getElementById('result-message').textContent = '';
  
  // Remove modal if exists
  const modal = document.querySelector('.modal');
  if (modal) {
    modal.remove();
  }
  
  // Re-enable buttons
  disableGameButtons(false);
}

// Reset all stats
function resetAllStats() {
  resetGame();
  totalGames = 0;
  totalWins = 0;
  totalLosses = 0;
  totalTies = 0;
  gameHistory = [];
  
  updateStats();
  updateHistoryDisplay();
}

// Change game mode
function changeGameMode(mode) {
  gameMode = mode;
  if (mode === 'infinite') {
    maxRounds = null;
  } else {
    maxRounds = parseInt(mode);
  }
  resetGame();
}

// Event listeners
document.getElementById('rock').addEventListener('click', () => playRound('rock'));
document.getElementById('paper').addEventListener('click', () => playRound('paper'));
document.getElementById('scissors').addEventListener('click', () => playRound('scissors'));
document.getElementById('reset').addEventListener('click', resetAllStats);
document.getElementById('mode').addEventListener('change', (e) => changeGameMode(e.target.value));

// Initialize
updateScoreboard();
updateStats();
updateHistoryDisplay();