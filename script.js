let cells = document.querySelectorAll(".cell");
let statusText = document.getElementById("status");
let restartBtn = document.getElementById("restart");


let currentPlayer = "X";
let gameActive = true;
let board = ["", "", "", "", "", "", "", "", ""];
                                           

const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

statusText.textContent = "Player X's turn";

cells.forEach(cell => {
    cell.addEventListener("click", handleClick);
});

restartBtn.addEventListener("click", restartGame);

function handleClick() {
    let index = this.getAttribute("data-index");

    if (board[index] !== "" || !gameActive) return;

    board[index] = currentPlayer;
    this.textContent = currentPlayer; 

    checkWinner();
}

function checkWinner() {
    let win = false;

    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;

        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            win = true;
            break;
        }
    }

    if (win) {
        statusText.textContent = `Player ${currentPlayer} Wins! 🎉`;
        statusText.style.color = "Green";
        gameActive = false;
        return;
    }

    if (!board.includes("")) {
        statusText.textContent = "It's a Draw!";
        statusText.style.color = "gray";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
    statusText.style.color = currentPlayer === "X" ? "blue" : "red";
}

function restartGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;

    cells.forEach(cell => cell.textContent = "");
    statusText.textContent = "Player X's turn";
}
