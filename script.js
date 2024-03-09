const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const resetButton = document.querySelector('button');

const EMPTY = '';
const PLAYER_X = 'X';
const PLAYER_O = 'O';
let currentPlayer = PLAYER_X;
let gameActive = true;

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

resetButton.addEventListener('click', resetGame);

function resetGame() {
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('win');
  });
  currentPlayer = PLAYER_X;
  gameActive = true;
}

function makeMove(index) {
  if (gameActive && cells[index].textContent === EMPTY) {
    cells[index].textContent = currentPlayer;
    if (checkWin(currentPlayer)) {
      endGame(currentPlayer);
    } else if (checkDraw()) {
      endGame(EMPTY);
    } else {
      currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
      if (currentPlayer === PLAYER_O) {
        makeAIMove();
      }
    }
  }
}

function makeAIMove() {
  let availableMoves = [];
  cells.forEach((cell, index) => {
    if (cell.textContent === EMPTY) {
      availableMoves.push(index);
    }
  });
  const randomIndex = Math.floor(Math.random() * availableMoves.length);
  makeMove(availableMoves[randomIndex]);
}

function checkWin(player) {
  return winningCombos.some(combination => {
    return combination.every(index => {
      return cells[index].textContent === player;
    });
  });
}

function checkDraw() {
  return [...cells].every(cell => {
    return cell.textContent !== EMPTY;
  });
}

function endGame(winner) {
  if (winner === EMPTY) {
    alert('It\'s a draw!');
  } else {
    alert(`Player ${winner} wins!`);
    winningCombos.forEach(combination => {
      if (combination.every(index => cells[index].textContent === winner)) {
        combination.forEach(index => cells[index].classList.add('win'));
      }
    });
  }
  gameActive = false;
}
