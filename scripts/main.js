
const playerFactory = (name, mark) => {
    return { name, mark }
}

const gameBoard = (() => {
    const player1 = playerFactory('p1', 'X');
    const player2 = playerFactory('p2', 'O');
    let gameBoard = [];
    let player = player1.name;
    
    //cache DOM
    const gameContainer = document.querySelector('#game-container');
    const gameBoxes = Array.from(document.querySelectorAll('.game-box'));
    const firstRow = gameBoxes.filter(box => gameBoxes.indexOf(box) <= 2)
    
    //bind events
    gameBoxes.forEach(box => box.addEventListener('click', markSpot));
    gameBoxes.forEach(box => box.addEventListener('click', _gameOver));

    
    function _render(){
        gameBoxes.forEach((box) => {
         (box.textContent === "") ? box.textContent = gameBoard[gameBoxes.indexOf(box)] : box.textContent === "";
        })
    }

    function _changeTurn(){
        (player === player1.name) ? player = player2.name : player = player1.name;
    }
    
    function _gameOver(){
        let count = 0;
        let value = gameBoard[0];
        let result = gameBoard.some((mark, i)=> {
            if (value !== mark){
                count = 0;
                value = mark;
            } 
            return ++count === 3 
            // console.log(gameBoxes[gameBoard.indexOf(mark)].getAttribute('data-index'))
            // console.log(gameBoxes[gameBoard.indexOf(mark)].closest('[data-index="1"]'))
           
        })
        console.log(result)
        // console.log(firstRow.forEach(box => {
        //     return mark[i] === box.textContent}))
    }

    function markSpot(){
        (player === player1.name) ? gameBoard[gameBoxes.indexOf(this)] = player1.mark : gameBoard[gameBoxes.indexOf(this)] = player2.mark;
        _changeTurn();
        _render();
    }

    return { markSpot }
})();


        // if (gameBoard[0] === gameBoard[1] && gameBoard[1] === gameBoard[2])console.log(true)
        // if (gameBoard[3] === gameBoard[4] && gameBoard[4] === gameBoard[5])console.log(true)

        // const firstRow = gameBoxes.filter(box => gameBoxes.indexOf(box) <= 2);
        // const secondRow = gameBoxes.filter(box => gameBoxes.indexOf(box) <= 5 && gameBoxes.indexOf(box) >= 3);
        // const thirdRow = gameBoxes.filter(box => gameBoxes.indexOf(box) <= 8 && gameBoxes.indexOf(box) >= 6);
        // const rows = {firstRow, secondRow, thirdRow};
        // console.log(rows)
    
        // const firstColumn = gameBoxes.filter(box => gameBoxes.indexOf(box) % 3 === 0);

