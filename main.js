let score = JSON.parse(localStorage.getItem('score')) ||  {
wins: 0,
losses: 0,
ties: 0
};

updateScoreElement();

/*  if(!score) {
score = {
wins: 0,
losses: 0,
ties: 0
};
} */

let isAutoPlay = false;
let intervalId;

//const autoPlay = () => {

//};


document.querySelector('.js-rock-button')
.addEventListener('click', () => {
  playGame('rock');
}); 

document.querySelector('.js-paper-button')
.addEventListener('click', () => {
  playGame('paper');
}); 

document.querySelector('.js-scissors-button')
.addEventListener('click', () => {
  playGame('scissors');
}); 

document.querySelector('.js-auto-play-button')
.addEventListener('click', () => {
  if (!isAutoPlay) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlay = true;
    document.querySelector('.auto-play-button')
    .innerHTML = `<button class="auto-play-button-2"> Break (B) </button>`

  } else {
    clearInterval(intervalId);
    isAutoPlay = false;
    document.querySelector('.auto-play-button')
    .innerHTML = `<button class="auto-play-button-2"> Resume (A) </button>`
  }
});

const resetScoreText = document.querySelector('.js-reset-score-text'); 

document.querySelector('.js-reset-score-button')
.addEventListener('click', () => {
    resetScoreText.innerHTML = 
    `Are you sure you want to reset the score?
    <button class="reset-button-yes">Yes</button>
    <button class="reset-button-no">No</button>`

    document.querySelector('.reset-button-yes')
    .addEventListener('click', () => {
      score.wins = 0;
      score.losses = 0;
      score.ties = 0;
    
      updateScoreElement();
      localStorage.removeItem('score');
      resetScoreText.remove();   
      location.reload();
  }); 

  document.querySelector('.reset-button-no')
  .addEventListener('click',() => {
    location.reload();
  });
});


//if documentinnerhtml => add event listner



// keydown event listener
document.body.addEventListener('keydown',(event) => {
  if (event.key === 'r') {
    playGame('rock'); 
  } else if (event.key === 'p') {
    playGame('paper');
  } else if (event.key === 's') {
    playGame('scissors');
  } else if (event.key === 'a') {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlay = true;
    document.querySelector('.auto-play-button')
    .innerHTML = `<button class="auto-play-button-2"> Break (B) </button>`
  } else if (event.key === 'b') {
    clearInterval(intervalId);
    isAutoPlay = false;
    document.querySelector('.auto-play-button')
    .innerHTML = `<button class="auto-play-button-2"> Resume (A) </button>`
  } else if (event.key === 'Backspace') {
    resetScoreText.innerHTML = 
    `Are you sure you want to reset the score?
    <button class="reset-button-yes">Yes</button>
    <button class="reset-button-no">No</button>`
    
    document.querySelector('.reset-button-yes')
    .addEventListener('click', () => {
    
        score.wins = 0;
        score.losses = 0;
        score.ties = 0;
      
        updateScoreElement();
        localStorage.removeItem('score');
        resetScoreText.remove();   
        location.reload();
      
  }); 
    
  document.querySelector('.reset-button-no')
  .addEventListener('click',() => {
    location.reload();
  
  });
}
});


function playGame(playerMove) {
const computerMove = pickComputerMove();

let result = '';


if (playerMove === 'scissors') {
if (computerMove === 'rock') {
result = 'You lose.';
} else if (computerMove === 'paper') {
result = 'You win.';
} else if (computerMove === 'scissors') {
result = 'Tie.';
}

} else if (playerMove === 'paper') {
if (computerMove === 'rock') {
result = 'You win.';
} else if (computerMove === 'paper') {
result = 'Tie.';
} else if (computerMove === 'scissors') {
result = 'You lose.';
}

} else if (playerMove === 'rock') {
if (computerMove === 'rock') {
result = 'Tie.';
} else if (computerMove === 'paper') {
result = 'You lose.';
} else if (computerMove === 'scissors') {
result = 'You win.';
}
}

if (result === 'You win.') {
score.wins++;
} else if (result === 'You lose.') {
score.losses++;
} else if (result === 'Tie.') {
score.ties++;
} 

document.querySelector('.js-result')
.innerHTML = result;
document.querySelector('.js-move')
.innerHTML = `You picked
  <img src="img/${playerMove}-emoji.png" alt="">
  <img src="img/${computerMove}-emoji.png" alt="">
  Computer picked`;
updateScoreElement();
localStorage.setItem('score', JSON.stringify(score));

}

function updateScoreElement() {
document.querySelector('.js-score')
.innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
};

function pickComputerMove() {
const randomNumber = Math.random();

let computerMove = '';

if (randomNumber >= 0 && randomNumber < 1 / 3) {
computerMove = 'rock';
} else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
computerMove = 'paper';
} else if (randomNumber >= 2 / 3 && randomNumber < 1) {
computerMove = 'scissors';
}

return computerMove;
}
