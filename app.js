document.addEventListener('DOMContentLoaded', () => {
    const gridDisplay = document.querySelector('.grid');
    const scoreDisplay = document.getElementById('score');
    const resultDisplay = document.getElementById('result');
    const width = 4;
    let squares = [];
    let items = [2,2,2,4];
    let score = 0;

    function createBoard() {
        for(let i = 0; i < width*width; i++) {
            //square is holding a html element div
            square = document.createElement('div');
            square.innerHTML = 0;
            gridDisplay.appendChild(square);
            squares.push(square);
        }
        generate();
        generate();
        let arr = document.querySelectorAll(".grid>*");
        console.log(arr);
        for(let i = 0; i < 16; i++){
            if(arr[i].innerHTML == 0){
                arr[i].style.opacity = 0.3;
            } else {
                arr[i].style.opacity = 1.0;
            }
        }
    }
    createBoard();



    function printBoard() {
        for(let i = 0; i < squares.length; i++) {
            if(i % 4 === 0){
                console.log(squares[i].innerHTML, squares[i + 1].innerHTML, squares[i + 2].innerHTML, squares[i + 3].innerHTML);
                // console.log("******");
            }
        }
    }
    printBoard();
    //generate two random numbers
    function generate() {
        let randomNumber = Math.floor(Math.random() * squares.length);
        if(squares[randomNumber].innerHTML == 0) {
            squares[randomNumber].innerHTML = items[Math.floor(Math.random() * items.length)];
        }
        else generate();
        let arr = document.querySelectorAll(".grid>*");
        console.log(arr);
        for(let i = 0; i < 16; i++){
            if(arr[i].innerHTML == 0){
                arr[i].style.opacity = 0.3;
            } else {
                arr[i].style.opacity = 1.0;
            }
        }
        checkGameOver();
    }



    //swipe right
    function moveRight() {
        for(let i = 0; i < 16; i++) {
            if(i % 4 === 0) {
                let totalOne = squares[i].innerHTML;
                let totalTwo = squares[i + 1].innerHTML;
                let totalThree = squares[i + 2].innerHTML;
                let totalFour = squares[i + 3].innerHTML;
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

                let filteredRow = row.filter(num => num);

                let zeroes = new Array(4 - filteredRow.length).fill(0);
                let newRow = zeroes.concat(filteredRow);
                console.log("=============");

                squares[i].innerHTML = newRow[0];
                squares[i+1].innerHTML = newRow[1];
                squares[i+2].innerHTML = newRow[2];
                squares[i+3].innerHTML = newRow[3];
            }
        }
    }


    //swipe left
    function moveLeft() {
        for(let i = 0; i < 16; i++) {
            if(i % 4 === 0) {
                let totalOne = squares[i].innerHTML;
                let totalTwo = squares[i + 1].innerHTML;
                let totalThree = squares[i + 2].innerHTML;
                let totalFour = squares[i + 3].innerHTML;
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

                
                let filteredRow = row.filter(num => num);
                
                let zeroes = new Array(4 - filteredRow.length).fill(0);
                let newRow = filteredRow.concat(zeroes);
                

                squares[i].innerHTML = newRow[0];
                squares[i+1].innerHTML = newRow[1];
                squares[i+2].innerHTML = newRow[2];
                squares[i+3].innerHTML = newRow[3];
            }
        }
    }


    //swipe down
    function moveDown() {
        for(let i = 0; i < 4; i++){
            let totalOne = squares[i].innerHTML;
            let totalTwo = squares[i+width].innerHTML;
            let totalThree = squares[i+ width*2].innerHTML;
            let totalFour = squares[i+ width*3].innerHTML;

            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

            let filteredColumn = column.filter(num => num);
            let missing = 4 - filteredColumn.length;
            let zeroes = Array(missing).fill(0);
            let newColumn = zeroes.concat(filteredColumn);
            
            squares[i].innerHTML = newColumn[0];
            squares[i+ width*1].innerHTML = newColumn[1];
            squares[i+ width*2].innerHTML = newColumn[2];
            squares[i+ width*3].innerHTML = newColumn[3];
        }
    }


    //swipe up
    function moveUp() {
        for(let i = 0; i < 4; i++){
            let totalOne = squares[i].innerHTML;
            let totalTwo = squares[i+width].innerHTML;
            let totalThree = squares[i+ width*2].innerHTML;
            let totalFour = squares[i+ width*3].innerHTML;

            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

            let filteredColumn = column.filter(num => num);
            let missing = 4 - filteredColumn.length;
            let zeroes = Array(missing).fill(0);
            let newColumn = filteredColumn.concat(zeroes);
            
            squares[i].innerHTML = newColumn[0];
            squares[i+ width*1].innerHTML = newColumn[1];
            squares[i+ width*2].innerHTML = newColumn[2];
            squares[i+ width*3].innerHTML = newColumn[3];
        }
    }

    function combineRow() {
        for(let i = 0; i < 15; i++) {
            if(squares[i].innerHTML === squares[i+1].innerHTML) {
                let combineTotals = parseInt(squares[i+1].innerHTML) + parseInt(squares[i].innerHTML);
                squares[i].innerHTML = combineTotals;
                squares[i + 1].innerHTML = 0;
                score += combineTotals;
                scoreDisplay.innerHTML = score;
            }
        }
        checkWin();
    }


    
    function combineColumn() {
        for(let i = 0; i < 12; i++) {
            if(squares[i].innerHTML === squares[i + width].innerHTML) {
                let combineTotals = parseInt(squares[i + width].innerHTML) + parseInt(squares[i].innerHTML);
                squares[i].innerHTML = combineTotals;
                squares[i + width].innerHTML = 0;
                score += combineTotals;
                scoreDisplay.innerHTML = score;
            }
        }
        checkWin();
    }




    function control(e) {
        if(e.keyCode === 39) {
            keyRight();
        }
        else if(e.keyCode === 37) {
            keyLeft();
        } 
        else if (e.keyCode === 38) {
            keyUp();
        } 
        else if (e.keyCode === 40) {
            keyDown();
        }
    }
    document.addEventListener('keyup', control);

    function keyRight() {
        let ans = false;
        let checkChange = new Array(4);
        for(let i = 0; i < 4; i++){
            checkChange[i] = new Array(4).fill(0);
        }
        for(let i = 0; i < 4; i++){
            for(let j = 0; j < 4; j++){
                checkChange[i][j] = squares[j + width*i].innerHTML;
            }
        }


        moveRight();
        combineRow();
        moveRight();

        for(let i = 0; i < 4; i++){
            for(let j = 0; j < 4; j++){
                if(checkChange[i][j] != squares[j + width*i].innerHTML){
                    ans = true;
                }
            }
        }
        if(ans) generate();
    }

    function keyLeft() {
        let ans = false;
        let checkChange = new Array(4);
        for(let i = 0; i < 4; i++){
            checkChange[i] = new Array(4).fill(0);
        }
        for(let i = 0; i < 4; i++){
            for(let j = 0; j < 4; j++){
                checkChange[i][j] = squares[j + width*i].innerHTML;
            }
        }


        moveLeft();
        combineRow();
        moveLeft();

        for(let i = 0; i < 4; i++){
            for(let j = 0; j < 4; j++){
                if(checkChange[i][j] != squares[j + width*i].innerHTML){
                    ans = true;
                }
            }
        }
        if(ans) generate();
    }

    function keyDown() {
        let ans = false;
        let checkChange = new Array(4);
        for(let i = 0; i < 4; i++){
            checkChange[i] = new Array(4).fill(0);
        }
        for(let i = 0; i < 4; i++){
            for(let j = 0; j < 4; j++){
                checkChange[i][j] = squares[j + width*i].innerHTML;
            }
        }


        moveDown();
        combineColumn();
        moveDown();

        for(let i = 0; i < 4; i++){
            for(let j = 0; j < 4; j++){
                if(checkChange[i][j] != squares[j + width*i].innerHTML){
                    ans = true;
                }
            }
        }
        if(ans) generate();
    }

    function keyUp() {
        let ans = false;
        let checkChange = new Array(4);
        for(let i = 0; i < 4; i++){
            checkChange[i] = new Array(4).fill(0);
        }
        for(let i = 0; i < 4; i++){
            for(let j = 0; j < 4; j++){
                checkChange[i][j] = squares[j + width*i].innerHTML;
            }
        }


        moveUp();
        combineColumn();
        moveUp();

        for(let i = 0; i < 4; i++){
            for(let j = 0; j < 4; j++){
                if(checkChange[i][j] != squares[j + width*i].innerHTML){
                    ans = true;
                }
            }
        }
        if(ans) generate();
    
    }

    //winning condition
    function checkWin() {
        for(let i = 0; i < squares.length; i++) {
            if(squares[i].innerHTML == 512) {
                resultDisplay.innerHTML = 'YOU WON!';
                document.removeEventListener('keyup', control);
                document.querySelector('.grid').style.opacity = "0.3";
            }
        }
    }

    //gameOver
    function checkGameOver() {
        let zeroes = 0;
        for(let i = 0; i < squares.length; i++) {
            if(squares[i].innerHTML == 0) zeroes++;
        }
        if(zeroes == 0){
            resultDisplay.innerHTML = 'GAME OVER!';
            document.removeEventListener('keyup', control);
            document.querySelector('.grid').style.opacity = "0.3";
        }
    }    
})