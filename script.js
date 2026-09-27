let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#restart");
let newButton = document.querySelector("#newGame")
let msg = document.querySelector("#msg")
let result = document.querySelector(".result")
let main = document.querySelector("main")
let show = document.querySelector("#show")
let buttons = document.querySelector(".buttons")
let tie = document.querySelector(".tie")
let playAgain = document.querySelector("#playAgain")


let winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

let turnO = true;

let resetGame = () => {
    turnO = true;
    enableBoxes();
};

let newGame = () => {
    turnO = true;
    enableBoxes();
    result.classList.add("hide","msg_container");
    buttons.classList.add("new_buttons")
    tie.classList.add("hide")
    result.classList.remove("new_msg_container")
    main.classList.remove("hide")
    reset.classList.remove("hide")
};


const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    };
};

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    };
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO === true){
            box.innerText = "O";
            // box.classList.add("O");
            box.style.color = "#597928";
            turnO = false;
        }else{
            box.innerText = "X";
            box.style.color = "#C36795";
            turnO = true;
        }
        box.disabled = true;
        checkWin();
    });
});

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`
    result.classList.remove("hide");
    main.classList.add("hide")
    disableBoxes();
};

const tieGame = () => {
    tie.classList.remove("hide")
    main.classList.add("hide")
};

const checkWin = () => {
    for(let pattern of winPatterns){
        let firstVal = boxes[pattern[0]].innerText;
        let secondVal = boxes[pattern[1]].innerText;
        let thiredVal = boxes[pattern[2]].innerText;

        if(firstVal != "" && secondVal != "" && thiredVal != ""){
            if(firstVal === secondVal && secondVal === thiredVal){
                showWinner(firstVal);
                return;
            };
        };
    };
    let allFilled = true;
    for(let box of boxes){
        if (box.innerText === ""){
            allFilled = false;
            break;
        };
    };
    if(allFilled){
        tieGame();
    };
};

reset.addEventListener("click",resetGame);
newButton.addEventListener("click",newGame);
show.addEventListener("click", () =>{
    result.classList.remove("msg_container")
    result.classList.add("new_msg_container")
    buttons.classList.remove("new_buttons")
    main.classList.remove("hide")
    reset.classList.add("hide")
})

playAgain.addEventListener("click", newGame)
