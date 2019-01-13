// Games values
let min = 1;
let max = 10;
let winningNum = getRandomNum(min, max);
let guessesLeft = 3;

// UI Elements
const game = document.querySelector('#game');
const minNum = document.querySelector('.min-num');
const maxNum = document.querySelector('.max-num');
const guessBtn = document.querySelector('#guess-btn');
const guessInput = document.querySelector('#guess-input');
const message = document.querySelector('.message');

// Assign UI min and max values
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener('mousedown', function(e) {
  if (e.target.className === 'play-again') {
    window.location.reload();
  }
});

// add event listener for guess
guessBtn.addEventListener('click', function() {
  let guessValue = parseInt(guessInput.value);

  // Validate the guess
  if (isNaN(guessValue) || guessValue < min || guessValue > max) {
    setMessage(`Please enter a guess between ${min} and ${max}`, 'red');
  }

  // Check if guess is correct
  if (guessValue === winningNum) {
    // game over - Won
    gameOver(true, `You won!. The winning number was ${winningNum}`);
  } else {
    // subtract from guesses left
    guessesLeft--;

    if (guessesLeft === 0) {
      // Game over - lost
      gameOver(false, `Game over, you lost. The winning number was ${winningNum}`);
    } else {
      // set message when wrong number
      setMessage(`${guessValue} was incorrect. You have ${guessesLeft} guesses left.`, 'red');
      // change border color
      guessInput.style.borderColor = 'red';
      // clear Input
      guessInput.value = '';
    }
  }
});

// set message function
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}

// Game Over function
function gameOver(won, msg) {
  let color;
  won === true ? (color = 'green') : (color = 'red');
  // disable input
  guessInput.disabled = true;
  // change border color
  guessInput.style.borderColor = color;
  // set text color
  message.style.color = color;
  // set message
  setMessage(msg);

  // Play again
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';
}

// Get Winning Number function
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
