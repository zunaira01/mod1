const choices = document.querySelectorAll('.choice');
const playerScoreElem = document.querySelector('.player-score');
const computerScoreElem = document.querySelector('.computer-score');
const resultElem = document.querySelector('#result');
const playAgainBtn = document.querySelector('#play-again');
const strtBtn = document.querySelector('start-button');
const countdownElem = document.querySelector('#countdown');
const computerChoiceElem = document.querySelector('#computer-choice');

const weapons = ['rock', 'paper', 'scissors'];
let playerScore = 0;
let computerScore = 0;
let countdown = 12;
let timeout;

// Function to generate random weapon for computer
function computerPlay() {
  const weaponIndex = Math.floor(Math.random() * weapons.length);
  return weapons[weaponIndex];
}

// Function to update score and display result
function updateScore(playerWeapon, computerWeapon) {
  clearTimeout(timeout);
  if (playerWeapon) {
    computerChoiceElem.innerHTML = `Computer chose: ${computerWeapon}.`;
    if (playerWeapon === computerWeapon) {
      resultElem.innerHTML = "It's a tie!";
    } else if (
      (playerWeapon === 'rock' && computerWeapon === 'scissors') ||
      (playerWeapon === 'paper' && computerWeapon === 'rock') ||
      (playerWeapon === 'scissors' && computerWeapon === 'paper')
    ) {
      resultElem.innerHTML = `${playerName} wins`;
      resultElem.classList.add('neonText')
      playerScore++;
      playerScoreElem.innerHTML = `${playerName}: ${playerScore}`;
    } else {
      resultElem.innerHTML = 'Computer wins!';
      computerScore++;
      computerScoreElem.innerHTML = `Computer: ${computerScore}`;
    }
    //start time function
    startTimer();
  } else {
    computerChoiceElem.innerHTML = `Game Over`;
    resultElem.innerHTML = `${playerName} did not make a choice! | ${playerName} lose the game!`;
    resultElem.style.color = 'red';
    resultElem.fontSize= 'xx-large';
    disableOptions();
  }

  // Best of 5 game(minus ties)
  if (playerScore === 3) {
    computerChoiceElem.innerHTML = 'Game Over';
    resultElem.textContent = `${playerName} wins the game!`;
    resultElem.style.color = 'green';
    
    disableOptions();
    stopTimer();
  }

  if (computerScore === 3) {
    resultElem.textContent = `${playerName} loses the game!`;
    resultElem.style.color = 'red';
    computerChoiceElem.innerHTML = 'Game Over';
    disableOptions();
    stopTimer();
  }
}

// Function to handle player choice
function selectWeapon() {
  clearTimeout(timeout);
  countdownElem.innerHTML = '12';
  countdown = 12;
  const playerWeapon = this.id;
  const computerWeapon = computerPlay();
  updateScore(playerWeapon, computerWeapon);
}

// Function to start countdown timer
function startTimer() {
  countdown--;
  countdownElem.innerHTML = countdown;
  if (countdown === 0) {
    const computerWeapon = computerPlay();
    updateScore(null, computerWeapon);
  } else {
    timeout = setTimeout(startTimer, 1200);
  }
}

function stopTimer() {
  clearInterval(timeout);
  countdown = 12;
  countdownElem.textContent = countdown;
}

// Function to reset the game
function resetGame() {
  playerScore = 0;
  computerScore = 0;
  countdown = 12;
  playerScoreElem.innerHTML = `${PlayerName}`;
  computerScoreElem.innerHTML = 'Computer: 0';
  resultElem.innerHTML = 'Choose Your Weapon!';
  countdownElem.innerHTML = '12';
  resultElem.style.color = '#5805a0bc';
  computerChoiceElem.innerHTML = '';
  enableOptions();
  startTimer();
}

function disableOptions() {
  choices.forEach((choice) => {
    choice.style.pointerEvents = 'none';
  });
}

function enableOptions() {
  choices.forEach((choice) => {
    choice.style.pointerEvents = 'auto';
  });
}

// Event listeners
choices.forEach((choice) => choice.addEventListener('click', selectWeapon));
playAgainBtn.addEventListener('click', resetGame);
  playAgainBtn.style.fontFamily ='Impact, Haettenschweiler, Arial Narrow Bold, sans-serif';
  

// Start countdown timer when player chooses their first option
countdownElem.innerHTML = countdown; // Set initial value of countdown in HTML
// timeout = setTimeout(startTimer, 1200);
strtBtn.addEventListener('click',startTimer,1200)