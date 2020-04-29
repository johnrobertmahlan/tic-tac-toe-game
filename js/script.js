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
function handleClick(evt) {
    console.log(evt.target.dataset.index);
}

function init() /* I don't need access to the event, so to speak, so I don't need a parameter; the information in the event is not important for this function */ {
    // This function will start/initialize the game or reset the game
    winner = false; // Nobody has won at the start of the game
    turn = 1; // We'll start with Player X's turn first
    gameboard = [null, null, null, null, null, null, null, null, null]; // We want the board to be clean when the game starts or resets, so each square needs to be empty
    render(); // This basically connects the CONTROLLER to the VIEW (i.e., the stuff the player can DO to what the player SEES)
}

function render() {
    
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