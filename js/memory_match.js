document.addEventListener("readystatechange", (event) => {
    if (event.target.readyState === "complete") {
        console.log("readyState: complete");
        startGame();
    }
});

let currentClick = 0;
let currentValue = 0;
let correctNum = 0;

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var aux = array[i];
        array[i] = array[j];
        array[j] = aux;
    }
    return array;
}

function createBoard(gamePanel, rows, cols) {
    const squareGrid = document.getElementById("square-grid");
    squareGrid.style.display = "grid";
    let templateRows = "";
    for(let i=0;i<rows;i++) templateRows += " 1fr";
    let templateCols = "";
    for(let i=0;i<cols;i++) templateCols += " 1fr";
    
    squareGrid.style.gridTemplateRows = templateRows;
    squareGrid.style.gridTemplateColumns = templateCols;

    let squareValues = [];
    let squares = [];
    for(let i = 0;i<rows;i++)
    {
        for(let j = 0;j<cols;j++)
        {
            let newSquare = document.createElement("div");
            newSquare.classList.add("square");
            newSquare.setAttribute("row", i);
            newSquare.setAttribute("col", j);
            
            squareValues.push(0);
            squares.push(newSquare);
            squareGrid.appendChild(newSquare);
        }
    }

    for(let i=0;i<rows * cols;i++)
        squareValues[i] = 1 + Math.floor(i / 2);
    shuffleArray(squareValues);

    squares.forEach((square) => {
        square.addEventListener("click", (event) => {
            let rowN = parseInt(square.getAttribute("row"));
            let colN = parseInt(square.getAttribute("col"));
            square.textContent = squareValues[rowN * cols + colN];
            if(currentClick === 0) {
                currentClick = square;
                currentValue = squareValues[rowN * cols + colN];
            } else {
                let thisValue = squareValues[rowN * cols + colN];
                if(thisValue !== currentValue) {
                    let a = square;
                    let b = currentClick;
                    setTimeout(function () {
                        a.textContent = "";
                        b.textContent = "";
                    }, 1500);
                }
                else {
                    square.style.backgroundColor = "#bbffbb";
                    currentClick.style.backgroundColor = "#bbffbb";
                    correctNum += 2;
                    if(correctNum >= rows * cols)
                    {
                        document.getElementById("you-win").textContent = "You Win!";
                    }
                }
                currentClick = 0;
                currentValue = 0;
            }
        });
    });
}

function startGame() {
    const playButton = document.getElementById("play-button");
    const gameDiffcultyPanel = document.getElementById("game-difficulty-panel");
    const rowNumber = document.getElementById("rows");
    const colNumber = document.getElementById("columns");
    const difficultyOutput = document.getElementById("difficulty-output");
    const gamePanel = document.getElementById("game-panel");
    const youWin = document.getElementById("you-win");
    youWin.textContent = "";
    gamePanel.style.display = "none";
    playButton.addEventListener("click", (event) => {
        event.preventDefault();
        var screenWidth = window.innerWidth;
        let rows = rowNumber.value;
        let cols = colNumber.value;
        if(rows * cols < 4)
            difficultyOutput.textContent = "Too small!\n";
        else if(cols > screenWidth / 90) {
            difficultyOutput.textContent = "Too many columns!\n";
        }
        else if(rows * cols % 2 == 1)
            difficultyOutput.textContent = "At least one number must be even!";
        else
        {
            gameDiffcultyPanel.style.display = "none";
            gamePanel.style.display = "flex";
            createBoard(gamePanel, rows, cols);
        }
    });

}