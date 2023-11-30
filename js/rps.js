document.addEventListener("readystatechange", (event) => {
    if (event.target.readyState === "complete") {
        console.log("readyState: complete");
        startGame();
    }
});

function startGame() {
    const button = document.querySelector(".game-button");
    button.addEventListener("click", (event) => {
        event.preventDefault();
        let input = document.getElementById("choice-input").value.toLowerCase();

        if(input != "rock" && input != "paper" && input != "scissors") {
            document.getElementById("text-output").textContent = "Invalid choice!"; 
            return;
        }

        let choices = ["rock", "paper", "scissors"];
        let choice = 1;
        switch(input) {
            case "rock": {
                choice = 0;
                break;
            }
            case "paper": {
                choice = 1;
                break;
            }
            default: choice = 2;
        }

        let computerChoice = Math.floor(Math.random() * 3);

        if((choice+1)%3 == computerChoice)
            document.getElementById("text-output").textContent = `You (${choices[choice]}) vs Computer (${choices[computerChoice]}). Computer Wins!`; 
        else if((computerChoice+1)%3 == choice)
            document.getElementById("text-output").textContent = `You (${choices[choice]}) vs Computer (${choices[computerChoice]}). You Win!`; 
        else
            document.getElementById("text-output").textContent = `You (${choices[choice]}) vs Computer (${choices[computerChoice]}). Draw!`; 
    })
}