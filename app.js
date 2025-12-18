let btnBoxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset-btn");
let mesgContainer = document.querySelector(".mesg-container");
let winMesg = document.querySelector("#win-mesg");
let newGameBtn = document.querySelector("#startBtn");
let hideGame = document.querySelector(".game");

let turnO = true;

let winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let drawMatch = () => {
    winMesg.innerText = "Match is Draw!";
    mesgContainer.classList.remove("hide");
    hideGame.classList.add("hide-game");
    resetBtn.classList.add("hide-game");
}

let count = 0;
btnBoxes.forEach((box) => {

    box.addEventListener("click", () => {

        if (turnO) {
            box.style.color = "#d62828";
            box.innerText = "O";
            turnO = false;
        } else {
            box.style.color = "green";
            box.innerText = "X";
            turnO = true;
        }
        count++;
        box.disabled = true;
        let isWinner = checkWinner();

        if (count === 9 && !isWinner) {
            drawMatch();
        }
    });

});

const disableButtons = () => {
    for (let box of btnBoxes) {
        box.disabled = true;
    }
}

const enableButtons = () => {
    for (let box of btnBoxes) {
        box.disabled = false;
        box.innerText = "";
        mesgContainer.classList.add("hide");
    }
}

const resetGame = () => {
    hideGame.classList.remove("hide-game");
    resetBtn.classList.remove("hide-game");
    turnO = true;
    enableButtons();
    count = 0;
}

const showWinner = (winner) => {
    winMesg.innerText = `Congratulation! Winner is ${winner}`;
    mesgContainer.classList.remove("hide");
    hideGame.classList.add("hide-game");
    resetBtn.classList.add("hide-game");

    disableButtons();
}

const checkWinner = () => {
    for (const pattern of winPatterns) {

        let pos1val = btnBoxes[pattern[0]].innerText;
        let pos2val = btnBoxes[pattern[1]].innerText;
        let pos3val = btnBoxes[pattern[2]].innerText;

        if (pos1val != "" && pos2val != "" && pos3val != "") {
            if (pos1val === pos2val && pos2val === pos3val) {

                showWinner(pos1val);
                return true;
            }
        }
    }
    return false;
}


newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);