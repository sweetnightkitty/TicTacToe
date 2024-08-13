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

        //Checks if game is over or returns winner
        const isGameOver = () => {
            //checks the upper row, left column
            if(
                board[0][0] != 0 &&
                (board[0][0] == board[0][1] && board[0][0] == board[0][2]) ||
                (board[0][0] == board[1][0] && board[0][0] == board[2][0])
             ) {
                return board[0][0];
            }

            //checks middle row, middle column, and two diagonals
            if(
                board[1][1] != 0 &&
                (board[1][1] == board[1][0] && board[1][1] == board[1][2]) ||
                (board[1][1] == board[0][1] && board[1][1] == board[2][1]) ||
                (board[1][1] == board[0][0] && board[1][1] == board[2][2]) ||
                (board[1][1] == board[0][2] && board[1][1] == board[2][0])
            ) {
                return board[1][1];
            }

            //checks the lower row, and right column
            if(
                board[2][2] != 0 &&
                (board[2][2] == board[2][1] && board[2][2] == board[2][0]) ||
                (board[2][2] == board[1][2] && board[2][2] == board[0][2])
            ) {
                return board[2][2];
            }

            //Counts how many spaces on the board have been taken
            let tempArray = [];
            for(let i = 0; i < 3; i++) {
                for(let j = 0; j < 3; j++) {
                    if(board[i][j] != 0) {
                        tempArray.push(1);
                    }
                }
            }

            //Announces a draw when all 9 spaces on the board are taken but no winner has been returned
            if(tempArray.length === 9) {
                return "draw";
            }

        }

        //Announces the winner
        if(isGameOver() == "O") {
            alert(activePlayer.name + " wins!");
        } else if(isGameOver() == "X") {
            alert(activePlayer.name + " wins!");
        } else if(isGameOver() == "draw") {
            alert("It's a draw!");
        }

        console.log(board); //logs updated board to console
        switchPlayers(); //switches players in preparation for the next round

    }

    return {
        playRound,
        getActivePlayer,
        getBoard: board,
    }
}

//function screenController - controls the UI and screen
function screenController() {
    const game = gameController();
    const announcePlayerTurn = document.querySelector(".player-turn");
    const gameBoardDiv = document.querySelector(".board");

    //clear the board
    gameBoardDiv.textContent = "";

    //new version of the board
    const board = game.getBoard();

    //get the current active player
    const activePlayer = game.getActivePlayer();

    //display the current player's turn
    announcePlayerTurn.textContent = `${activePlayer.name}'s turn!`;

    //Creates gameboard on screen
    let cellId = 0;
    board.forEach(row => {
        row.forEach(cell => {
            const cellButton = document.createElement("button");
            cellButton.classList.add("cell");

            //Gives each gamepiece a unique dataset.number (1-9) to easily target
            cellId+= 1;
            cellButton.dataset.number = cellId; 
            gameBoardDiv.appendChild(cellButton);
        })
    })
}

