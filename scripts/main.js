const playerFactory = (name, mark) => {
    return { name, mark }
}

const gameBoard = (() => {
    const player1 = playerFactory('p1', 'X');
    const player2 = playerFactory('p2', 'O');
    let gameBoard = [];
    let player = player1.name;
    
    // cache DOM
    const gameBoxes = Array.from(document.querySelectorAll('.game-box'));
    const resetButton = document.querySelector('#reset');
    const firstRow = gameBoxes.filter(box => gameBoxes.indexOf(box) <= 2)
    const secondRow = gameBoxes.filter(box => gameBoxes.indexOf(box) >= 3 && gameBoxes.indexOf(box) <= 5);
    const thirdRow = gameBoxes.filter(box => gameBoxes.indexOf(box) >= 6 && gameBoxes.indexOf(box) <= 8);

    // bind events
    gameBoxes.forEach(box => box.addEventListener('click', markSpot));
    gameBoxes.forEach(box => box.addEventListener('click', _gameOver));
    resetButton.addEventListener('click', () => {
        gameBoxes.forEach(box => box.addEventListener('click', markSpot));
        gameBoxes.forEach(box => box.addEventListener('click', _gameOver));
        gameBoxes.forEach(box => box.textContent = '');
        gameBoard = [];
    })
    
    function _render(){
        gameBoxes.forEach((box, i) => {
         (box.textContent === "") ? box.textContent = gameBoard[i] : box.textContent === "";
        })
    }

    function _changeTurn(){
        (player === player1.name) ? player = player2.name : player = player1.name;
    }
    
    function _gameOver(){
        let commonMarks = [];
        let count = 0;
        let value = gameBoard[0];
        let result = gameBoard.some(mark => {
            if (value !== mark){
                count = 0;
                value = mark;
            }  
            // Columns  
            if (gameBoard[0] === mark && mark === gameBoard [3]
               && gameBoard[3] === gameBoard[6])return true;
            if (gameBoard[1] === mark && mark === gameBoard [4]
               && gameBoard[4] === gameBoard[7])return true;
            if (gameBoard[2] === mark && mark === gameBoard [5]
            && gameBoard[5] === gameBoard[8])return true;

            // Diagonals
            if (gameBoard[2] === mark && mark === gameBoard [4]
               && gameBoard[4] === gameBoard[6])return true;
            if (gameBoard[0] === mark && mark === gameBoard [4]
               && gameBoard[4] === gameBoard[8])return true;
            
            // Rows
            if (++count === 3){
                commonMarks.shift();
                commonMarks.push(mark);
                console.log(commonMarks);
               return firstRow.every(box => box.textContent === commonMarks[0]) || 
                      secondRow.every(box => box.textContent === commonMarks[0]) ||
                      thirdRow.every(box => box.textContent === commonMarks[0]);
            }
        })
        if (result){
            gameBoxes.forEach(box => box.removeEventListener('click',markSpot));
            gameBoxes.forEach(box => box.removeEventListener('click',_gameOver));
            alert(`${value} Won!`);
        }
        else if (!result && gameBoxes.every(box => box.textContent !== '')){
            gameBoxes.forEach(box => box.removeEventListener('click',markSpot));
            gameBoxes.forEach(box => box.removeEventListener('click',_gameOver));
            alert(`It's a tie!`);
        }
    }

    function markSpot(){
        (player === player1.name) ? gameBoard[gameBoxes.indexOf(this)] = player1.mark : gameBoard[gameBoxes.indexOf(this)] = player2.mark;
        _changeTurn();
        _render();
    }
})();


