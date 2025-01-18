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
            if(xCount === 3)
                return players.getPlayer1Name() + " Wins";
            else if(oCount === 3)
                return players.getPlayer2Name() + " Wins";
            xCount = 0;
            oCount = 0;
        }
        // check cols for win ***********************
        xCount = 0;
        oCount = 0;
        for(let col = 0; col < 3; col++) {
            for(let row = 0; row < 3; row++) {
                if(board.isEmptySpace(row,col))
                    foundEmptySpace = true; 
                if(board.readSquare(row,col) === 'X')
                    xCount++;
                else if(board.readSquare(row,col) === 'O')
                    oCount++;
            }
            if(xCount === 3)
                return players.getPlayer1Name() + " Wins";
            else if(oCount === 3)
                return players.getPlayer2Name() + " Wins";
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
            return players.getPlayer1Name() + " Wins";
        else if(oCount === 3)
            return players.getPlayer2Name() + " Wins";
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
            return players.getPlayer1Name() + " Wins";
        else if(oCount === 3)
            return players.getPlayer2Name() + " Wins";;

        // check for tie ***********************        
        if(!foundEmptySpace)
            return "Tie game!";
        else
            return "";   // game still in progress
    }
    return {playTurn, isGameOver, getTurn, resetTurn};
})(board);


const players = (function() {
    let player1 = "";
    let player2 = "";
    const getPlayer1Name = () => player1;
    const getPlayer2Name = () => player2;
    const setPlayer1Name = (name) => {
        player1 = name;
    };
    const setPlayer2Name = (name) => {
        player2 = name;
    };
    return {getPlayer1Name, getPlayer2Name, setPlayer1Name, setPlayer2Name}
})();

const gameGUI = (function() {

    const dialog = document.querySelector("dialog");
    dialog.showModal();
    const okButton = document.querySelector(".ok-button");
    okButton.addEventListener("click", () => {
        players.setPlayer1Name(document.querySelector("#player1").value);
        players.setPlayer2Name(document.querySelector("#player2").value);
        gameStatus.innerHTML = players.getPlayer1Name() + "'s turn to play";
        dialog.close();
    });
    const boardSquares = document.querySelectorAll(".board-square");
    const gameStatus = document.querySelector(".game-status");
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
            gameStatus.innerHTML = gameLogic.isGameOver();
            if(gameLogic.isGameOver() === "")
            {
                let currentPlayer = "";
                if(gameLogic.getTurn() === "X")
                    currentPlayer = players.getPlayer1Name();
                else
                    currentPlayer = players.getPlayer2Name();
                gameStatus.innerHTML = currentPlayer + "'s turn to play";
            }
        });
    });
    restartBtn.addEventListener("click", function() {
        board.reset();
        boardSquareArray.forEach((boardSquares) => {
            boardSquares.innerHTML = "";
        });
        gameStatus.innerHTML = players.getPlayer1Name() + " turn to play";
        gameLogic.resetTurn();
    })
})();