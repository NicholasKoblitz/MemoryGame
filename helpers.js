// Creates a random color
function randomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    let color = `rgb(${r},${g},${b})`;

    return color;
}

// Places two of the same color into an arry
function placeColor(arr, count) {
    for (let i = 0; i < count / 2; i++) {
        let color = randomColor();
        arr.push(color);
        arr.push(color);
    }

}



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



// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
    for (let color of colorArray) {
        // create a new div
        const newDiv = document.createElement("div");

        // give it a class attribute for the value we are looping over
        newDiv.classList.add(color);

        // call a function handleCardClick when a div is clicked on
        newDiv.addEventListener("click", handleCardClick);

        newDiv.addEventListener('mouseout', function (event) {
            event.target.style.transition = 'box-shadow 0.5s';
        })

        // append the div to the element with an id of game
        gameContainer.append(newDiv);
    }
}