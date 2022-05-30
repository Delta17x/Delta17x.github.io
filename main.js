const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const input = document.getElementById("input1");
const label = document.getElementById("label1");
const guessLabel = document.getElementById("guessLabel");
const scoreLabel = document.getElementById("labelScore");
const titleLabel = document.getElementById("title");
const avgLabel = document.getElementById("avgLabel");
const validWordCount = validWords.length;

document.body.style.backgroundColor = "#1a1a1b";


resize();
window.addEventListener("resize", resize);
center(label);

let required = getRandom2String();
let playerScore = 0;
let playerScoreInstant = 0;
let playerGuesses = 0;
let validPlayerGuess = false;
let helpPressed = true;
helpButtonPress();

function getScore(answer) {
    let ret = 0;
    for (let i = 0; i < answer.length; i++) {
        if (i <= 5)
            ret += 1;
        else if (i <= 10)
            ret += 2;
        else if (i <= 15)
            ret += 4;
        else
            ret += 8;
    }
    return ret;
}

function helpButtonPress() {
    helpPressed = !helpPressed;
    if (helpPressed) {
        document.getElementById("howToPlayDiv").style.visibility="visible";
        document.getElementById("scoringDiv").style.visibility="visible";
    }
    else {
        document.getElementById("howToPlayDiv").style.visibility="hidden";
        document.getElementById("scoringDiv").style.visibility="hidden";
    }
}

function getRandom2String() {
    let result = "";
    let curWord = validWords[Math.floor(Math.random() * validWordCount)];
    let rand = Math.floor(Math.random() * curWord.length) - 1;
    if (rand < 0) {
        rand = 0;
    }

    result += curWord[rand];
    result += curWord[rand + 1];
    return result.toUpperCase();
}

function isValidWord(word) {
    return validWords.includes(word.toLowerCase());
}

function increaseScore(amount) {
    let counter = 0;
    playerScoreInstant += amount;
    let inter = setInterval(function () {
        playerScore++;
        counter++;
        if (counter >= amount) {
            clearInterval(inter);
        }

    }, 40);

}

function onKeyDown(event) {
    if (event.keyCode == 13) {
        answer = input.value.toUpperCase();
        if (validPlayerGuess) {
            increaseScore(getScore(answer));
            required = getRandom2String();
            input.value = "";
            playerGuesses++;
        }
    }
}

function resize(event) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function center(element, xoffset = 0, yoffset = 0) {
    element.style.left = (canvas.width - element.offsetWidth) / 2 + xoffset + "px";
    element.style.top = (canvas.height - element.offsetHeight) / 2 + yoffset + "px";
}

function draw() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;


    center(label, 0, -30);
    center(input, 0, 20);
    center(scoreLabel, 0, 70);
    center(guessLabel, 0, 120);
    center(avgLabel, 0, 170);

    titleLabel.style.left = (canvas.width - titleLabel.offsetWidth) / 2 + "px";

    label.innerHTML = required;
    scoreLabel.innerHTML = "Score: " + playerScore;
    guessLabel.innerHTML = "Guesses: " + playerGuesses;
    avgLabel.innerHTML = "Score per guess: " + Math.floor(playerScoreInstant / playerGuesses);

    input.value = input.value.toUpperCase();
    validPlayerGuess = isValidWord(input.value) && input.value.includes(required);

    if (validPlayerGuess) {
        input.style.color = "#228C22";
    }
    else {
        input.style.color = "#FF0000";

    }
}

setInterval(draw, 10);
