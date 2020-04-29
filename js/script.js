// MODEL

/* ----- constants ----- */

// This section includes all information about a tic-tac-toe game that WILL NOT change
//Thus, we want to store the PLAYERS, since the number of players will never change, and the WINNING COMBINATIONS, since the ways to win tic-tac-toe will never change

const players = {
    '1': 'X',
    '-1': 'O'
};

const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

/* ----- app's state (variables) ----- */

// This section will include information that changes between games or during the game

let turn, gameboard, winner;


// CONTROLLER

/* ----- cached element references ----- */

//This section will include those elements that we will need to make changes to throughout the game
const spanEl = document.querySelector('span');

const gameboardEl = document.getElementById('gameboard');

const squareEls = document.getElementsByClassName('square');

const buttonEl = document.querySelector('button');

/* ----- event listeners ----- */

//We want all the squares to be clickable, but since each square is a child element within the gameboard, we can attach the event listener to the gameboard
gameboardEl.addEventListener('click', handleClick);

buttonEl.addEventListener('click', init);




/* ----- functions ----- */
init(); // Call this function immediately so that the game is loaded when the page loads

function handleClick(evt) {
    const selectedIdx = evt.target.dataset.index; // This is basically a number 0-8 (see index.html)

    // If a square is clicked on, we need to update the gameboard state
    // If square already has a value, don't update it!
    if(winner || gameboard[selectedIdx]) {
        return; //quits the function if there is a value for gameboard[selectedIdx] (i.e., if gameboard[selectedIdx] is NOT NULL, then we're not going to run the rest of the code); this prevents us from "overwriting" someone who already clicked on a square
    }
    gameboard[selectedIdx] = turn; // the gameboard is an array; the index cited in brackets is the index of the square that was clicked on (evt.target.dataset.index) --> this tells us who "owns" that square by assigning it to a player --> we change the value to the value of the player, essentially

    // We also need to toggle whose turn it is
    turn *= -1;

    // Check the gameboard to see if there is a winner
    winner = checkWinner();

    render(); // Here we once again transfer the state of the game to the DOM
}

function init() /* I don't need access to the event, so to speak, so I don't need a parameter; the information in the event is not important for this function */ {
    // This function will start/initialize the game or reset the game
    winner = false; // Nobody has won at the start of the game
    turn = 1; // We'll start with Player X's turn first (see the spanEl.textContent = players[turn] thing below and think more about it)
    gameboard = [null, null, null, null, null, null, null, null, null]; // We want the board to be clean when the game starts or resets, so each square needs to be empty
    render(); // This basically connects the CONTROLLER to the VIEW (i.e., the stuff the player can DO to what the player SEES)
}

function render() {
    // transfer the state of our gameboard array to our DOM elements
    gameboard.forEach(function(value, index) {
        squareEls[index].textContent = players[value]; // This will return either X or O, since player 1 is set to X and player -1 is set to O;
    })
    if(!winner) {
        spanEl.textContent = players[turn]; // What is happening here? We're passing turn to players? Since turn is set to 1...if I want to get the key in the players object to be equal to 1, then - since turn was set to 1 - this is the same as citing players['1]; NOTE that this also fills the span in our HTML to show us which player's turn it is
    } else if (winner  === 'T') {
        alert('Tie game!');
    } else {
        alert(`${players[winner]} wins!`);
    }
    
}

function checkWinner() {
    // Compare winCombos to gameboard! --> Check winCombos and compare them to current positions of 1s or -1s inside the gameboard (NOTICE THE DATA-CENTRIC APPROACH: NOT LOOKING FOR Xs and Os)
    // Whoever is the winner, we return that value: 1 or -1
    // If no winner and no nulls, there is a tie
    for(let i=0; i<winCombos.length; i++) {
        if(Math.abs(gameboard[winCombos[i][0]] + gameboard[winCombos[i][1]] + gameboard[winCombos[i][2]]) === 3) return gameboard[winCombos[i][0]];
        else if(gameboard.includes(null)) return false;
        else return 'T';
    }
}


//Pseudo-Code

/*
0) We need to initialize the game and decide who goes first ("set the turn to X")
    0.1) We need to create the gameboard we can use to keep track of all the game pieces
    0.2) We need to set winner to false; this variable will help us keep track of whether we should keep playing
    0.3) We need to store the winning combinations in a data structure
    0.4) We need to store the players in a data structure and be able to toggle between them to switch turns

1) We need all the squares to be clickable
    1.1) We need to know which square was clicked on    

2) If a square is clicked on, we need to place an X or an O in the square, depending on whose turn it is

*/