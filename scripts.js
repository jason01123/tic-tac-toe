const board = (function () {
    let boardArray = [['_','_','_'],['_','_','_'],['_','_','_']];
    const playX = (row,col) => boardArray[row][col] = 'X';
    const playO = (row,col) => boardArray[row][col] = 'O';
    const readSquare = (row,col) => boardArray[row][col];
    const toString = () => boardArray.toString();
    const isEmptySpace = (row,col) => {
        return boardArray[row][col] === '_';
    }
    const reset = () => boardArray = [['_','_','_'],['_','_','_'],['_','_','_']];
    return {playX, playO, toString, readSquare, isEmptySpace, reset};
})();

const gameLogic = (function (board) {
    let turn = 'X';
    const playTurn = (row,col) => {
        if(board.isEmptySpace(row,col)){
            if(turn === 'X') {
                turn = 'O';
                board.playX(row,col);
            }
            else {
                turn = 'X';
                board.playO(row,col);
            }
        }
    }

    const getTurn = () => {
        return turn;
    }

    const resetTurn = () => {
        turn = 'X';
    }

    const isGameOver = () => {
        let foundEmptySpace = false;
        let xCount = 0;
        let oCount = 0;
        // check rows for win
        for(let row = 0; row < 3; row++) {
            for(let col = 0; col < 3; col++) {
                if(board.isEmptySpace(row,col))
                    foundEmptySpace = true; 
                if(board.readSquare(row,col) === 'X')
                    xCount++;
                else if(board.readSquare(row,col) === 'O')
                    oCount++;
            }
             //console.log("xCount: " + xCount);
             //console.log("oCount: " + oCount);
            if(xCount === 3)
                return "X Wins";
            else if(oCount === 3)
                return "O Wins";
            xCount = 0;
            oCount = 0;
        }
        // check cols for win ***********************
        xCount = 0;
        oCount = 0;
        for(let col = 0; col < 3; col++) {
            //console.log("col: " + col);
            for(let row = 0; row < 3; row++) {
                if(board.isEmptySpace(row,col))
                    foundEmptySpace = true; 
                if(board.readSquare(row,col) === 'X')
                    xCount++;
                else if(board.readSquare(row,col) === 'O')
                    oCount++;
            }
            //console.log("xCount: " + xCount);
            //console.log("oCount: " + oCount);
            if(xCount === 3)
                return "X Wins";
            else if(oCount === 3)
                return "O Wins";
            xCount = 0;
            oCount = 0;
        }
        // check for diagonal top left to bottom right win *********
        xCount = 0;
        oCount = 0;
        if(board.readSquare(0,0) === 'X')
            xCount++;
        else if(board.readSquare(0,0) === 'O')
            oCount++;
        if(board.readSquare(1,1) === 'X')
            xCount++;
        else if(board.readSquare(1,1) === 'O')
            oCount++;
        if(board.readSquare(2,2) === 'X')
            xCount++;
        else if(board.readSquare(2,2) === 'O')
            oCount++;
        if(xCount === 3)
            return "X Wins";
        else if(oCount === 3)
            return "O Wins";
        // check for diagonal bottom left to top right win *********
        xCount = 0;
        oCount = 0;
        if(board.readSquare(0,2) === 'X')
            xCount++;
        else if(board.readSquare(0,2) === 'O')
            oCount++;
        if(board.readSquare(1,1) === 'X')
            xCount++;
        else if(board.readSquare(1,1) === 'O')
            oCount++;
        if(board.readSquare(2,0) === 'X')
            xCount++;
        else if(board.readSquare(2,0) === 'O')
            oCount++;
        if(xCount === 3)
            return "X Wins";
        else if(oCount === 3)
            return "O Wins";

        // check for tie ***********************        
        if(!foundEmptySpace)
            return "Tie game!";
        else
            return "";   // game still in progress
    }
    return {playTurn, isGameOver, getTurn, resetTurn};
})(board);


const gameGUI = (function() {
    const boardSquares = document.querySelectorAll(".board-square");
    const gameStatus = document.querySelector(".game-status");
    const gameTurn = document.querySelector(".game-turn");
    const restartBtn = document.querySelector(".restart-btn");
    const boardSquareArray = Array.from(boardSquares);
    boardSquareArray.forEach((boardSquares, index) => {
        boardSquares.addEventListener("click", function() {
            // calculate row and column indexes based on sequentially 
            // numbered divs
            if(gameLogic.isGameOver() === "") {
                gameLogic.playTurn(Math.floor(index / 3),index % 3)
                boardSquares.innerHTML = board.readSquare(Math.floor(index / 3),index % 3);
            }
            //showBoard();
            gameStatus.innerHTML = gameLogic.isGameOver();
            if(gameLogic.isGameOver() === "")
                gameStatus.innerHTML = gameLogic.getTurn() + "'s turn to play";

        });
    });
    restartBtn.addEventListener("click", function() {
        board.reset();
        boardSquareArray.forEach((boardSquares) => {
            boardSquares.innerHTML = "";
        });
        gameStatus.innerHTML = "X's turn to play";
        //gameStatus.innerHTML = "";
        gameLogic.resetTurn();
    })
})();


/* console.log("It is " + gameLogic.getTurn() + "s turn.");
gameLogic.playTurn(2,1);
console.log(gameLogic.isGameOver());
showBoard();
console.log("It is " + gameLogic.getTurn() + "s turn.");
gameLogic.playTurn(0,0);
console.log(gameLogic.isGameOver());
showBoard();
console.log("It is " + gameLogic.getTurn() + "s turn.");
gameLogic.playTurn(0,2);
console.log(gameLogic.isGameOver());
showBoard();
console.log("It is " + gameLogic.getTurn() + "s turn.");
gameLogic.playTurn(1,0);
console.log(gameLogic.isGameOver());
showBoard();
console.log("It is " + gameLogic.getTurn() + "s turn.");
gameLogic.playTurn(1,2);
console.log(gameLogic.isGameOver());
showBoard();
console.log("It is " + gameLogic.getTurn() + "s turn.");
gameLogic.playTurn(2,2);
console.log(gameLogic.isGameOver());
showBoard();
console.log("It is " + gameLogic.getTurn() + "s turn.");
gameLogic.playTurn(2,0);
console.log(gameLogic.isGameOver());
showBoard();
console.log("It is " + gameLogic.getTurn() + "s turn.");
gameLogic.playTurn(1,1);
console.log(gameLogic.isGameOver());
showBoard();
console.log("It is " + gameLogic.getTurn() + "s turn.");
gameLogic.playTurn(0,1);
console.log(gameLogic.isGameOver());
showBoard(); */


function showBoard() {
    let str = "";
    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            str += board.readSquare(i,j) + "  ";
        }
        console.log(str + "\n");
        str = "";
    }
}

