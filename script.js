//function getBoard - to create the board
function getBoard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for(let i = 0; i < rows; i++) {
        board[i] = [];
        for(let j = 0; j < columns; j++) {
            board[i].push(0);
        }
    }

    const getBoard = () => board;

    return {
        getBoard,
    }
}


//funtion gameController - controls game play behind the scenes
function gameController() {
    //Store player's info and associated game piece
    const players = [
        {
            name: "Player 1",
            marker: "O",
        },

        {
            name: "Player 2",
            marker: "X",
        }
    ]

    //default player set to player 1 to start the game
    let activePlayer = players[0];

    //Switches player turns
    const switchPlayers = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const getActivePlayer = () => activePlayer;

    //gets board
    const board = getBoard.getBoard();

}

//function screenController - controls the UI and screen