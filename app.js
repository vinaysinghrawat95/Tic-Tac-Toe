let btnBoxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset-btn");
let mesgContainer = document.querySelector(".mesg-container");
let winMesg = document.querySelector("#win-mesg");
let newGameBtn = document.querySelector("#startBtn");

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

let drawMatch = () =>{
    winMesg.innerText = "Match is Draw!";
    mesgContainer.classList.remove("hide");
}

let count = 0;
btnBoxes.forEach((box) => {

    box.addEventListener("click", () => {

        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            box.style.color = "green";
            turnO = true;
        }
        count++;
        console.log(count);
        
        box.disabled = true;
        let isWinner = checkWinner();

        if(count === 9 && !isWinner){
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
    turnO = true;
    enableButtons();
    count = 0;
}

const showWinner = (winner) => {
    winMesg.innerText = `Congratulation! Winner is ${winner}`;
    mesgContainer.classList.remove("hide");
    disableButtons();
}

const checkWinner = () => {
    for (const pattern of winPatterns) {

        let pos1val = btnBoxes[pattern[0]].innerText;
        let pos2val = btnBoxes[pattern[1]].innerText;
        let pos3val = btnBoxes[pattern[2]].innerText;

        if (pos1val != "" && pos2val != "" && pos3val != "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                console.log(pos1val);
                console.log(pos2val);
                console.log(pos3val);


                console.log("Winner Winnner!", pos1val);
                showWinner(pos1val);
                return true;

            }
        }


    }
    return false;
}


newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);