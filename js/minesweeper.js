document.addEventListener("readystatechange", (event) => {
    if (event.target.readyState === "complete") {
        // console.log("readyState: complete");
        setUpButton();
    }
});

let squares = [];
let squareValues = [];
let visited = [];
let squaresCleared = 0;
let totalNumberOfBombs = 0;
let tableHasBeenSetup = 0;
let fieldRows, fieldCols;
let gameOver;
let playerInputActive = true;
let colors = [0, "royalblue", "green", "crimson", "purple", "darkorange", "teal", "orangered", "black"];

function setupTable(totalRows, totalCols, startingSquare, difficulty) {
    fieldCols = totalCols;
    fieldRows = totalRows;
    let row = parseInt(startingSquare.getAttribute("row"));
    let col = parseInt(startingSquare.getAttribute("col"));
    let diffChance;
    if(difficulty === "easy")
        diffChance = 0.15;
    else if(difficulty === "medium")
        diffChance = 0.18;
    else
        diffChance = 0.2;
    for(let i=0;i<squareValues.length;i++)
    {
        let thisRow = Math.floor(i / fieldCols);
        let thisCol = i % fieldCols;
        if(Math.abs(thisRow - row)<=1 && Math.abs(thisCol - col)<=1)
        {
            squareValues[i] = 0;
        }
        else
        {
            let chance = Math.random();
            let isBomb = 0;
            if(chance < diffChance)
            {
                isBomb = 1;
                totalNumberOfBombs++;
            }
            squareValues[i] = isBomb;
        }
    }
    for(let i=0;i<squareValues.length;i++) {
        if(squareValues[i] === 1)
            squareValues[i] = 'B';
    }
    let directions = [[-1,-1], [-1,0], [-1,1], [0, -1], [0,1], [1,-1],[1,0],[1,1]];

    for(let i=0;i<squareValues.length;i++) {
        let bombsAround = 0;
        let row = Math.floor(i / fieldCols);
        let col = i % fieldCols;
        for(let j=0;j<directions.length;j++)
        {
            let newRow = row + directions[j][0];
            let newCol = col + directions[j][1];
            let index = newRow * fieldCols + newCol;
            if(newRow >= 0 && newCol >= 0 && newRow < fieldRows && newCol < fieldCols) {
                if(squareValues[index] === 'B') {
                    bombsAround++;
                }
            }
        }
        if(squareValues[i] !== 'B') {
            squareValues[i] = bombsAround;
            squares[i].style.color = colors[bombsAround];
        }
    }

}

function clearField(row, col) {
    if (row < 0 || col < 0 || row >= fieldRows || col >= fieldCols || visited[row * fieldCols + col]) {
        return;
    }

    visited[row * fieldCols + col] = true;

    if (squareValues[row * fieldCols + col] === 0 && squares[row * fieldCols + col].classList.contains("unknown")) {
        squares[row * fieldCols + col].classList.remove("unknown");
        squares[row * fieldCols + col].classList.remove("flag");
        // Recursively clear neighboring squares
        clearField(row - 1, col - 1);
        clearField(row - 1, col);
        clearField(row - 1, col + 1);
        clearField(row, col - 1);
        clearField(row, col + 1);
        clearField(row + 1, col - 1);
        clearField(row + 1, col);
        clearField(row + 1, col + 1);
        squaresCleared++;
    }
    else if(squareValues[row * fieldCols + col] !== 'B' && squares[row * fieldCols + col].classList.contains("unknown")) {
        squares[row * fieldCols + col].classList.remove("unknown");
        squares[row * fieldCols + col].classList.remove("flag");
        squares[row * fieldCols + col].textContent = squareValues[row * fieldCols + col];
        squaresCleared++;
    }
}

function revealBombs() {
    for(let i=0;i<squares.length;i++)
    {
        if(squareValues[i] === 'B') {
            // squares[i].classList.remove("unknown");
            squares[i].classList.remove("flag");
            squares[i].classList.add("bomb");
        }
    }
}


function treatClick(square) {
    if(square.classList.contains("unknown") && !square.classList.contains("flag")) {
        let row = parseInt(square.getAttribute("row"));
        let col = parseInt(square.getAttribute("col"));
        let value = squareValues[fieldCols * row + col];
        if(value === 'B') {
            square.classList.remove("unknown");
            square.classList.add("bomb");
            gameOver.style.display = "flex";
            gameOver.textContent = "You lose!\n";
            playerInputActive = false;
            revealBombs();
        }
        else {
            clearField(row,col);
            square.classList.remove("unknown");
            square.classList.remove("flag");
            if(value !== 0) square.textContent = value;
            if(squaresCleared + totalNumberOfBombs === fieldCols * fieldRows) {
                gameOver.style.display = "flex";
                gameOver.textContent = "You Win!";
                playerInputActive = false;
            }
        }
    }
}

function treatFlags(square) {
    if(square.classList.contains("unknown"))
        square.classList.toggle("flag");
}

function setupMinefield(rows,cols, difficulty) {
    const minefield = document.getElementById("minefield");
    minefield.style.display = "grid";
    let templateRows = "";
    for(let i=0;i<rows;i++) templateRows += " 1fr";
    let templateCols = "";
    for(let i=0;i<cols;i++) templateCols += " 1fr";
    
    minefield.style.gridTemplateRows = templateRows;
    minefield.style.gridTemplateColumns = templateCols;

    for(let i = 0;i<rows;i++)
    {
        for(let j = 0;j<cols;j++)
        {
            let newSquare = document.createElement("div");
            newSquare.classList.add("square");
            newSquare.classList.add("unknown");
            newSquare.setAttribute("row", i);
            newSquare.setAttribute("col", j);
            newSquare.style.fontWeight = 700;
            if(difficulty === "easy") {
                newSquare.style.fontSize = "1.5rem";
                newSquare.style.minWidth = "3rem";
            }
            else if(difficulty === "medium") {
                newSquare.style.fontSize = "1.2rem";
                newSquare.style.minWidth = "2rem";
            }
            else {
                newSquare.style.fontSize = "1rem";
                newSquare.style.minWidth = "1.5rem";
            }
            
            squareValues.push(0);
            visited.push(0);
            squares.push(newSquare);
            minefield.appendChild(newSquare);
            newSquare.addEventListener("click", function (event) {
                event.preventDefault();
                if(playerInputActive) {
                    if(tableHasBeenSetup === 0) {
                        setupTable(rows,cols, newSquare, difficulty);
                        tableHasBeenSetup = 1;
                    }
                    treatClick(newSquare);
                }
            });
            newSquare.addEventListener("contextmenu", function (event) {
                event.preventDefault();
                if(playerInputActive) {
                    treatFlags(newSquare);
                }
            });
        }
    }
    
}

function setUpButton() {
    const playButton = document.getElementById("play-button");
    const difficultyPanel = document.getElementById("difficulty-panel");
    const difficultySelect = document.getElementById("difficulty-select");
    gameOver = document.getElementById("game-over");
    gameOver.style.display = "none";
    gameOver.style.padding = "1rem";
    gameOver.style.fontWeight = 700;
    gameOver.style.fontSize = "1.5rem";
    playButton.addEventListener("click", (event) => {
        let difficulty = difficultySelect.value;
        let screenSize = window.screen.width;
        let rows = 0, cols = 0;
        if(screenSize < 700) {
            if(difficulty === "easy")
                rows = 6, cols = 6;
            else if(difficulty === "medium")
                rows = 8, cols = 8;
            else
                rows = 12, cols = 12;
        }
        else {
            if(difficulty === "easy")
                rows = 8, cols = 10;
            else if(difficulty === "medium")
                rows = 14, cols = 18;
            else
                rows = 20, cols = 24;
        }
        setupMinefield(rows, cols, difficulty);
        difficultyPanel.style.display = "none";
    });
}