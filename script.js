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

    const playerOne = (user) => players[0].name = user;
    const playerTwo = (user) => players[1].name = user;

    let activePlayer = players[0];

    const switchPlayers = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const getActivePlayer = () => activePlayer;

    //gets board
    const board = getBoard();

    //selectedButton is the button pressed by player on UI
    const playRound = (selectedButton) => {
        let row;
        let column;

        //Identifies what row the selectedButton is in
        if(selectedButton < 4) {
            row = 0;
        } else if(selectedButton > 6) {
            row = 2;
        } else {
            row = 1;
        }

        //Identifies what column the selectedButton is in
        if(
            selectedButton == 1 || 
            selectedButton == 4 ||
            selectedButton == 7
        ) {
            column = 0;
            } else if(
                selectedButton == 2 ||
                selectedButton == 5 ||
                selectedButton == 8
            ) {
                column = 1;
            } else {
                column = 2;
            }

        board[row][column] = activePlayer.marker;


        console.log(board); //logs updated board to console
        switchPlayers(); //switches players in preparation for the next round
        
    }

    //Checks if game is over or returns winner
    const isGameOver = () => {
        //checks the left column
        if(board[0][0] == board[1][0] && board[0][0] == board[2][0] && board[0][0] != 0) {
            return board[0][0];
        }

        //checks the upper row
        if(board[0][0] == board[0][1] && board[0][0] == board[0][2] && board[0][0] != 0) {
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

        //checks the lower row
        if(board[2][2] == board[2][1] && board[2][2] == board[2][0] && board[2][2] != 0) {
            return board[2][2];
        }

        //checks the right column
        if(board[2][2] == board[1][2] && board[2][2] == board[0][2] && board[2][2] != 0) {
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


    return {
        playRound,
        getActivePlayer,
        getBoard: board,
        isGameOver,
        playerOne,
        playerTwo,
    }
}

//function screenController - controls the UI and screen
function screenController() {
    let game = gameController();
    const announcePlayerTurn = document.querySelector(".player-turn");
    const gameBoardDiv = document.querySelector(".board");

    let userOne = "Jack";
    let userTwo = "Sally";

    const startBtn = document.querySelector(".btn-start");
    const form = document.querySelector("form");
    const formSubmitBtn = document.querySelector(".btn-submit-form");
    startBtn.addEventListener("click", () => {

        startBtn.style.display = "none";
        form.style.visibility = "visible";

        formSubmitBtn.addEventListener("click", () => {
            const gameDiv = document.querySelector(".game");
            gameDiv.style.visibility = "visible";
            form.style.visibility = "hidden";

            userOne = document.getElementById("userOne").value;
            userTwo = document.getElementById("userTwo").value;

            //initial render of the game
            game.playerOne(userOne);
            game.playerTwo(userTwo);
            updateScreen();
        })

    })

    const resetBtn = document.querySelector(".btn-reset");
    resetBtn.addEventListener("click", () => {
        //clear the board
        gameBoardDiv.textContent = "";

        //Reruns the function, and reassigns to game in order to reset the 2d array back to all zeros and restart the game play.
        game = gameController();

        game.playerOne(userOne);
        game.playerTwo(userTwo);
        updateScreen();
    })

    const updateScreen = () => {

        //clear the board
        gameBoardDiv.textContent = "";

        //new version of the board
        const board = game.getBoard;

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
                cellButton.dataset.number = cellId

                //Assigns button O or X after game play and disables button from further use
                if(cell != 0) {
                    cellButton.textContent = cell;
                    cellButton.disabled = true;
                }

                gameBoardDiv.appendChild(cellButton);
            })
        })  
    }


    function clickBoard(e) {
        const selectedButton = e.target.dataset.number;

        //ensures you don't select the gaps
        if(!selectedButton) return;
        
        //gets the activePlayer before players are switched
        const activePlayer = game.getActivePlayer();

        //runs game based on button clicked
        game.playRound(selectedButton);

        //checks who the winner is (if one), and then generates a winner message
        const winner = game.isGameOver();
        const winnerModal = document.querySelector(".winner-modal");
        const winnerMsg = document.querySelector(".winner-msg");
        const gameBoard = document.querySelector(".game");
        const playAgainBtn = document.querySelector(".btn-play-again");

        //displays the winner modal announcing a winner if O X or draw is called
        if(winner == "O") {
            winnerMsg.textContent = activePlayer.name + " is the winner!";
            winnerModal.style.display = "block";
            gameBoard.style.visibility = "hidden";
            playAgainBtn.disabled = false;

        } else if(winner == "X") {
            winnerMsg.textContent = activePlayer.name + " is the winner!";
            winnerModal.style.display = "block";
            gameBoard.style.visibility = "hidden";
            playAgainBtn.disabled = false;
        } else if(winner == "draw") {
            winnerMsg.textContent = "It's a draw!";
            winnerModal.style.display = "block";
            gameBoard.style.visibility = "hidden";
            playAgainBtn.disabled = false;
        }


        playAgainBtn.addEventListener("click", () => {
            //Prevents the button from working until a winner or draw is found.
            if(winner != 0) {
                //clear the board
                gameBoardDiv.textContent = "";

                //Reruns the function, and reassigns to game in order to reset the 2d array back to all zeros and restart the game play.
                game = gameController();

                winnerModal.style.display = "none";
                const startBtn = document.querySelector(".btn-start");
                startBtn.style.display = "block";

                game.playerOne(userOne);
                game.playerTwo(userTwo);
                updateScreen();

            }
        })

        updateScreen();
    }


    gameBoardDiv.addEventListener("click", clickBoard);

    //initial render (player 1 is not here at first)
    // game.playerOne(userOne);
    // game.playerTwo(userTwo);
    // updateScreen();
}

screenController();
