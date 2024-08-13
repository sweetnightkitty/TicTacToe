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

    return board;
}


//funtion gameController - controls game play behind the scenes
function gameController() {
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

    let activePlayer = players[0];

    const switchPlayers = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const getActivePlayer = () => activePlayer;

    //gets board
    const board = getBoard();

    //selectedButton is the button pressed by player on UI
    const playRound = () => {
        let row;
        let column;

        row = prompt("Choose a row");
        column = prompt("Choose a column");

        board[row][column] = activePlayer.marker;
        console.log(board); //logs updated board to console
        switchPlayers();
    }

    return {
        playRound,
        getActivePlayer,
        getBoard: board,
    }
}

const game = gameController();

//function screenController - controls the UI and screen