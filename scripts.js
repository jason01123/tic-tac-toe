const board = (function () {
    let boardArray = [['_','_','_'],['_','_','_'],['_','_','_']];
    const playX = (row,col) => boardArray[row][col] = 'X';
    const playO = (row,col) => boardArray[row][col] = 'O';
    const readSquare = (row,col) => boardArray[row][col];
    const toString = () => boardArray.toString();
    const isEmptySpace = (row,col) => {
        return boardArray[row][col] === '_';
    }
    return {playX, playO, toString, readSquare, isEmptySpace};
})();

const gameLogic = (function (board) {
    let turn = 'O';
    let gameOver = false;
    const playTurn = (row,col) => {
        if(board.isEmptySpace(row,col)){
            if(turn === 'O') {
                turn = 'X';
                board.playX(row,col);
            }
            else {
                turn = 'O';
                board.playO(row,col);
            }
        }
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
        // check cols for win
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
        if(!foundEmptySpace)
            return "Tie";
        else
            return "No Winner Yet";   
    }
    return {playTurn, isGameOver};
})(board);

gameLogic.playTurn(0,0);
console.log(gameLogic.isGameOver());
showBoard();
gameLogic.playTurn(1,1);
console.log(gameLogic.isGameOver());
showBoard();
gameLogic.playTurn(0,2);
console.log(gameLogic.isGameOver());
showBoard();
gameLogic.playTurn(1,0);
console.log(gameLogic.isGameOver());
showBoard();
gameLogic.playTurn(1,2);
console.log(gameLogic.isGameOver());
showBoard();
gameLogic.playTurn(2,2);
console.log(gameLogic.isGameOver());
showBoard();
gameLogic.playTurn(2,0);
console.log(gameLogic.isGameOver());
showBoard();
gameLogic.playTurn(0,1);
console.log(gameLogic.isGameOver());
showBoard();
gameLogic.playTurn(2,1);
console.log(gameLogic.isGameOver());
showBoard();

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

