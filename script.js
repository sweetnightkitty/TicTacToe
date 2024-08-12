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

//function screenController - controls the UI and screen