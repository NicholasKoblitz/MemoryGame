const gameContainer = document.getElementById("game");
const startButton = document.querySelector('#start');
const scoreBox = document.querySelector('#score-box');
const score = document.querySelector('#score');
const lowestScore = document.querySelector('#low-score');
const colorList = [];
let clicks = 0;


const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);



// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    // newDiv.numbered = colorArray.indexOf(color)
    
    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    newDiv.addEventListener('mouseout', function(event) {
      event.target.style.transition = 'box-shadow 0.5s';
    })

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}



// TODO: Implement this function!
function handleCardClick(event) {
  let clicked = event.target;
  
  // Updates the tile background
  if(clicks < 2 && clicks >= 0) {
    clicked.style.backgroundColor = clicked.className;
    clicked.style.transition = 'background-color 2s'
    colorList.push(clicked.className);
    console.log(clicked.className)
    clicks++;
    console.log(clicks)
  }

  if(colorList.length === 2) {
    // Checks if the two tiles are the same color and incerments the score
    if(colorList[0] === colorList[1]) {
      clicks = 0;
      colorList.pop();
      colorList.pop();
      let scoreInt = parseInt(score.innerText);
      scoreInt++
      score.innerText = scoreInt;
    }
    // Resets the tiles to a single color
    else if (colorList[0] !== colorList[1]) {
      setTimeout(function() {
        for(let i = 0; i < gameContainer.children.length; i++) {
          gameContainer.children[i].style.transition = 'background-color 2s'
          gameContainer.children[i].style.backgroundColor = '';
        }
        clicks = 0;
      }, 1000);
      colorList.pop();
      colorList.pop();
      
    }
  }


  const all = [];
  let val = 0;

  // Keeps track of the number of pairs completed
  for(let i = 0; i < gameContainer.children.length; i++) {
    all.push(gameContainer.children[i].style.backgroundColor);

    if(gameContainer.children[i].style.backgroundColor !== '') {
      val++;
    } 
    else {
      val = 0;
    }
  }

  // When the player wins
  if(val === 10) {
    if(parseInt(score.innerText) < parseInt(lowScore)) {
      localStorage.setItem('scores', JSON.stringify(score.innerText));
    }
    // Creates the play again button
    const playAgain = document.createElement('BUTTON');
    playAgain.classList.add('again');
    playAgain.innerText = 'Play Again';
    const againDiv = document.querySelector('#play');
    againDiv.append(playAgain);

    // Event listener for the play again button
    againDiv.addEventListener('click', function() {
      let count = 10;
      for(let i = 0; i < count; i++) {
        gameContainer.children[0].remove();
      }
      // Resets the incermented score and sets the lowest score
      score.innerText = '0';
      lowestScore.innerText = JSON.parse(localStorage.getItem('scores'));
      againDiv.remove();
      // Recreates tiles
      createDivsForColors(shuffledColors);
    })
  }
}

startButton.addEventListener('click', function() {
  createDivsForColors(shuffledColors);
  startButton.remove();
})

// When DOM loads
lowestScore.innerText = JSON.parse(localStorage.getItem('scores'));


