let greenSquare;
let redSquare;
let yellowSquare;
let blueSquare;
let squares = [];
let buttonsDoAnything = false;
const ids = ["green-square","red-square","yellow-square","blue-square"];
let correctSequence = [];
let pressedSequence = [];
let tasks = [];
let gameOverText;

document.addEventListener("readystatechange", (event) => {
    if (event.target.readyState === "complete") {
        // console.log("readyState: complete");
        setUpButton();
    }
});

function playSequence() {
    buttonsDoAnything = false;
    correctSequence.push(Math.floor(Math.random() * 4));
    tasks = [];
    if(correctSequence.length > 1)
    {
        tasks.push(() => squares[correctSequence[correctSequence.length-2]].style.border="10px solid black");
        tasks.push(() => squares[correctSequence[correctSequence.length-2]].style.border="none");
    }
    tasks.push(() => {}); // for more delay at the end
    tasks.push(() => {});
    for(let i=0;i<correctSequence.length;i++) {
        tasks.push(() => squares[correctSequence[i]].style.border="10px solid black");
        tasks.push(() => squares[correctSequence[i]].style.border="none");
    }
    tasks.push(() => {}); // for more delay at the end
    tasks.push(() => {});

    let index = 0;
    function execSequence() {
        if (index < tasks.length) {
            tasks[index]();
            index++;
            setTimeout(execSequence, 250);
        }
        else {
            buttonsDoAnything = true;
        }
    }

    execSequence();
    
    pressedSequence = [];
}

function playSquare(squareIndex) {
    buttonsDoAnything = false;
    tasks = [];
    tasks.push(() => squares[squareIndex].style.border="10px solid black");
    tasks.push(() => squares[squareIndex].style.border="none");

    let index = 0;
    function execSequence() {
        if (index < tasks.length) {
            tasks[index]();
            index++;
            setTimeout(execSequence, 250);
        }
        else {
            buttonsDoAnything = true;
        }
    }

    execSequence();
}

function setUpButton() {
    greenSquare = document.getElementById("green-square");
    redSquare = document.getElementById("red-square");
    yellowSquare = document.getElementById("yellow-square");
    blueSquare = document.getElementById("blue-square");
    gameOverText = document.getElementById("game-over-text");
    gameOverText.style.display = "none";
    squares = [greenSquare, redSquare, yellowSquare, blueSquare];
    const playButton = document.getElementById("play-button");

    playButton.addEventListener("click", (event) => {
        playButton.style.display = "none";
        playSequence(squares);
    });

    squares.forEach(square => {
        square.addEventListener("click", (event) => {
            if(buttonsDoAnything) {
                // get first apparition of this id
                const id = square.id;
                const index = ids.indexOf(id);
                pressedSequence.push(index);
                if(pressedSequence[pressedSequence.length - 1] !== correctSequence[pressedSequence.length - 1]) {
                    buttonsDoAnything = false;
                    gameOverText.style.display = "flex";
                    gameOverText.textContent = `Game over! Score: ${correctSequence.length-1}`;
                    gameOverText.style.fontWeight = "bold";
                }
                else if(pressedSequence.length === correctSequence.length) {
                    playSequence();
                }
                else {
                    playSquare(index);
                }
            }
        });
    });
}