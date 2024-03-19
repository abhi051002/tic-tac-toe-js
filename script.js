let boxes = document.querySelectorAll('.boxes');
let msgContainer = document.querySelector('.msg-container');
let msg = document.querySelector('#msg');
let game = document.querySelector('.main');
let newGame = document.querySelector('#new-btn');
let resetGame = document.querySelector('#reset-btn');
let turnO = true;


const winnerPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
]
let count = 0;
const reset = () => {
    turnO = true;
    count =0;
    enableButtons();
    msgContainer.classList.add('hide');
}
boxes.forEach(box => {
    box.addEventListener('click', () => {
        if (turnO) {
            box.innerHTML = 'O';
            turnO = false;
        }
        else {
            box.innerHTML = 'X';
            turnO = true;
        }
        count++;
        box.disabled = true;
        let iswinner = winner();
        if (count == 9 && !iswinner) {
            gameDraw();
        }
    })
});
const gameDraw = () => {
    msg.innerText = `Match Was Draw!!`;
    msgContainer.classList.remove('hide');
    disableButtons();
}

const disableButtons = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}
const enableButtons = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = '';
    }
}


const showWinner = (winner) => {
    msg.innerText = `Congratulations 🎉 Winner is ${winner}`;
    msgContainer.classList.remove('hide');
    disableButtons();
}
const winner = () => {
    for (let pattern of winnerPattern) {
        let p1 = boxes[pattern[0]].innerText;
        let p2 = boxes[pattern[1]].innerText;
        let p3 = boxes[pattern[2]].innerText;
        if (p1 != "" && p2 != "" && p3 != "") {
            if (p1 === p2 && p2 === p3) {
                showWinner(p1);
                return true;
            }
        }
    }
}


newGame.addEventListener('click', () => reset());
resetGame.addEventListener('click', () => reset());