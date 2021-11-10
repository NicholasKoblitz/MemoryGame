const gameContainer = document.getElementById("game");
const startButton = document.querySelector('#start');
const scoreBox = document.querySelector('#score-box');
const score = document.querySelector('#score');
const lowestScore = document.querySelector('#low-score');
const colorList = [];
const COLORS = [];
let clicks = 0;


// TODO: Implement this function!
function handleCardClick(event) {
  let clicked = event.target;

  // Updates the tile background
  if (clicks < 2 && clicks >= 0) {
    clicked.style.backgroundColor = clicked.className;
    clicked.style.transition = 'background-color 1s'
    colorList.push(clicked.className);
    console.log(clicked.className)
    clicks++;
    console.log(clicks)
  }

  if (colorList.length === 2) {
    // Checks if the two tiles are the same color and incerments the score
    if (colorList[0] === colorList[1]) {
      clicks = 0;
      colorList.pop();
      colorList.pop();
      let scoreInt = parseInt(score.innerText);
      scoreInt++
      score.innerText = scoreInt;
    }
    // Resets the tiles to a single color
    else if (colorList[0] !== colorList[1]) {
      setTimeout(function () {
        for (let i = 0; i < gameContainer.children.length; i++) {
          gameContainer.children[i].style.transition = 'background-color 0.7s'
          gameContainer.children[i].style.backgroundColor = '';
        }
        clicks = 0;
      }, 700);
      colorList.pop();
      colorList.pop();

    }
  }

  const all = [];
  let val = 0;

  // Keeps track of the number of pairs completed
  for (let i = 0; i < gameContainer.children.length; i++) {
    all.push(gameContainer.children[i].style.backgroundColor);

    if (gameContainer.children[i].style.backgroundColor !== '') {
      val++;
    }
    else {
      val = 0;
    }
  }

  // When the player wins
  if (val === 10) {
    localStorage.setItem('scores', JSON.stringify(score.innerText))
    if (parseInt(score.innerText) < parseInt(lowestScore)) {
      localStorage.setItem('scores', JSON.stringify(score.innerText));
    }
    // Creates the play again button
    const playAgain = document.createElement('button');
    playAgain.classList.add('again');
    playAgain.innerText = 'Play Again';
    const againDiv = document.querySelector('#play');
    againDiv.append(playAgain);

    // Event listener for the play again button
    againDiv.addEventListener('click', function () {
      let count = 10;
      for (let i = 0; i < count; i++) {
        gameContainer.children[0].remove();
      }
      // Resets the incermented score and sets the lowest score
      score.innerText = '0';
      lowestScore.innerText = JSON.parse(localStorage.getItem('scores'));
      againDiv.remove();
      val = 0
      // Recreates tiles
      shuffledColors = shuffle(COLORS);
      createDivsForColors(shuffledColors);
    })
  }
}




startButton.addEventListener('click', function () {
  placeColor(COLORS, 10);
  let shuffledColors = shuffle(COLORS);
  createDivsForColors(shuffledColors);
  startButton.remove();
})

// When DOM loads
lowestScore.innerText = JSON.parse(localStorage.getItem('scores'));


