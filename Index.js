const rows = 4;
const cols = 4;
let board = Array(rows).fill().map(() => Array(cols).fill(""));
let currentPlayer = "red";

const boardDiv = document.getElementById("board");
const status = document.getElementById("status");

function createBoard() {
  boardDiv.innerHTML = "";
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.onclick = () => dropPiece(c);
      boardDiv.appendChild(cell);
    }
  }
}

function dropPiece(col) {
  for (let r = rows - 1; r >= 0; r--) {
    if (board[r][col] === "") {
      board[r][col] = currentPlayer;
      updateBoard();
      if (checkWin()) {
        status.innerText = currentPlayer + " wins!";
        return;
      }
      currentPlayer = currentPlayer === "red" ? "blue" : "red";
      return;
    }
  }
}

function updateBoard() {
  const cells = document.querySelectorAll(".cell");
  let i = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      cells[i].className = "cell " + board[r][c];
      i++;
    }
  }
}

function checkWin() {
  // horizontal
  for (let r = 0; r < rows; r++)
    if (board[r].every(cell => cell === currentPlayer)) return true;

  // vertical
  for (let c = 0; c < cols; c++)
    if (board.every(row => row[c] === currentPlayer)) return true;

  return false;
}

createBoard();