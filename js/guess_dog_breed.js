let generateButton;
let guessInput;
let guessOutput;
let guessButton;
let gamePanel;
let spot;
let breed;

document.addEventListener("readystatechange", (event) => {
    if (event.target.readyState === "complete") {
        // console.log("readyState: complete");
        generateButton = document.getElementById("generate-button");
        guessButton = document.getElementById("guess-button");
        gamePanel = document.getElementById("game-panel");
        spot = document.getElementById("image-spot");
        guessInput = document.getElementById("guess-input");
        guessOutput = document.getElementById("guess-output");

        guessInput.style.display = "none";
        guessButton.style.display = "none";
        guessOutput.style.display = "none";
        spot.style.display = "none";
        setUpButton();
    }
});

const fetchWord = async () => {
    spot.style.display = "flex";
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    const result = await response.json();
    let link = result.message;
    breed = link.split("/")[4].replace(/-/g, ' ');
    spot.textContent = "";
    spot.style.backgroundImage = `url(${link})`;
    spot.style.backgroundSize = "cover";
    guessInput.style.display = "inline-block";
    guessInput.value = "";
    guessButton.style.display = "inline-block";
    guessOutput.style.display = "none";
    generateButton.style.display = "none";
}

function analyzeGuess() {
    guessInput.style.display = "none";
    guessButton.style.display = "none";
    guessOutput.style.display = "flex";
    generateButton.style.display = "inline-block";

    let userGuess = guessInput.value;
    if (userGuess === breed) {
        guessOutput.textContent = `Yes! It is a ${breed}!`;
    }
    else {
        guessOutput.textContent = `No! It was a ${breed}!`;
    }
}

function setUpButton() {

    generateButton.addEventListener("click", (event) => {
        spot.textContent = "fetching image...";
        fetchWord();
    });

    guessButton.addEventListener("click", (event) => {
        event.preventDefault();
        analyzeGuess();
    });
}