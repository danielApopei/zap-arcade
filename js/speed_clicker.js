let timePanel;
let timeSelect;
let resetProgress;
let rpOutput;
let playButton;
let clickArea;
let countText;
let timerText;

let totalTime;
let currentScore;
let inputActive;

document.addEventListener("readystatechange", (event) => {
    if (event.target.readyState === "complete") {
        // console.log("readyState: complete");
        timePanel = document.getElementById("time-panel");
        timeSelect = document.getElementById("time-select");
        playButton = document.getElementById("play-button");
        clickArea = document.getElementById("click-area");
        countText = document.getElementById("count-text");
        timerText = document.getElementById("timer-text");
        resetProgress = document.getElementById("reset-progress");
        rpOutput = document.getElementById("rp-output");
        
        clickArea.style.display = "none";
        countText.style.display = "none";
        timerText.style.display = "none";
        setUpButton();
    }
});

function finishGame() {
    inputActive = false;
    countText.textContent = `Your score: ${currentScore}`;
    // get highscore from local storage
    let targetZone = `zaparcade-speedclicker-${timeSelect.value}s-highscore`;
    if (localStorage.getItem(targetZone) !== null) {
        let localHighScore = localStorage.getItem(targetZone);
        if(currentScore > localHighScore)
            localStorage.setItem(targetZone, currentScore);
    }
    else {
        localStorage.setItem(targetZone, currentScore);
    }
    
    timerText.textContent = `High score for ${timeSelect.value}s: ${localStorage.getItem(targetZone)}`;
}

function timerFunction() {
    totalTime--;
    timerText.textContent = totalTime + 's';
    if (totalTime <= 0)
        finishGame();
    else
        setTimeout(timerFunction, 1000);
}


function setUpButton() {
    resetProgress.addEventListener("click", (event) => {
        localStorage.removeItem("zaparcade-speedclicker-15s-highscore");
        localStorage.removeItem("zaparcade-speedclicker-30s-highscore");
        localStorage.removeItem("zaparcade-speedclicker-60s-highscore");
        rpOutput.textContent = "Progress cleared!";
    });

    playButton.addEventListener("click", (event) => {
        inputActive = true;
        totalTime = timeSelect.value;
        timePanel.style.display = "none";
        clickArea.style.display = "flex";
        countText.style.display = "flex";
        countText.textContent = "0";
        timerText.style.display = "flex";
        timerText.textContent = totalTime + 's';
        currentScore = 0;
        setTimeout(timerFunction, 1000);
    });

    clickArea.addEventListener("contextmenu", (event) => {
        event.preventDefault();
    });

    clickArea.addEventListener("click", (event) => {
        event.preventDefault();
        if(inputActive) {
            currentScore++;
            countText.textContent = currentScore;
        }
    })
}