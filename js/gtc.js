document.addEventListener("readystatechange", (event) => {
    if (event.target.readyState === "complete") {
        console.log("readyState: complete");
        startGame();
    }
});

function generateNewColor() {
    const square = document.getElementById("random-color-area");
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);
    square.style.backgroundColor = `rgba(${red}, ${green}, ${blue})`;
    return [red, green, blue];
}

function startGame() {
    let color = [];
    const button = document.querySelector(".game-button");
    const message = document.getElementById("text-output");
    const nextButton = document.getElementById("next-button");
    const secondSquare = document.getElementById("guess-color-area");
    
    
    button.addEventListener("click", (event) => {
        event.preventDefault();
        
        const redChoice = document.getElementById("red-guess").value;
        const greenChoice = document.getElementById("green-guess").value;
        const blueChoice = document.getElementById("blue-guess").value;
        const red = color[0];
        const green = color[1];
        const blue = color[2];

        const redDiff = Math.abs(redChoice - red);
        const greenDiff = Math.abs(greenChoice - green);
        const blueDiff = Math.abs(blueChoice - blue);

        console.log(`Differences: ${redDiff}, ${greenDiff}, ${blueDiff}`);
        
        let totalSum = redDiff + greenDiff + blueDiff;
        console.log(`Sum: ${totalSum}`)

        let score = Math.ceil(Math.max((360 - totalSum) / 3.6, 0));
        console.log(`Score: ${score}`);

        console.log("Here was the actual color: ", color[0], color[1], color[2]);

        console.log(nextButton);
        nextButton.style.display = "flex";
        secondSquare.style.backgroundColor = `rgb(${redChoice}, ${greenChoice}, ${blueChoice})`;
        secondSquare.style.display = "flex";

        message.textContent = `Score: ${score}%! The color was [${color[0]}, ${color[1]}, ${color[2]}]`;
        
    });

    nextButton.addEventListener("click", (event) => {
        event.preventDefault();
        color = generateNewColor();
        message.textContent = "";
        nextButton.style.display = "none";
        secondSquare.style.display = "none";
    });

    color = generateNewColor();
}