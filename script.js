var boardValues = [];
var winner = "";
var fSlash = [2, 4, 6];
var bSlash = [0, 4, 8];

function makeBoard() {
  for (let row = 0; row < 3; row++) {
    boardValues.push([]);
    for (let col = 0; col < 3; col++) {
      boardValues[row][col] = "_";
    }
  }
  showBoard();
  newGame();
}

function showBoard() {
  let board = "";
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      board += " | " + boardValues[row][col] + " | ";
    }
    board += "\n";
  }
  alert(board);
}

function newGame() {
  let gameOver = false;
  let goFirst = Math.floor(Math.random() * 2);
  while (gameOver == false) {
    if (goFirst % 2 == 0) {
      alert("cpu goes first");
      cTurn();
      if (cTurn() == true) {
        if (detectWinR() == showBoard()) {
          winner = "cpu";
          gameOver = true;
        }
        else if (detectWinC() == showBoard()) {
          winner = "cpu";
          gameOver = true;
        }
        else {
          winner = "nobody";
        }
      }
    }
    else {
      alert("user goes first");
      uTurn();
      if (uTurn() == true) {
        if (detectWinR() == true) {
          winner = "user";
          gameOver = true;
        }
        else if (detectWinC() == true) {
          winner = "user";
          gameOver = true;
        }
        else {
          winner = "nobody";
        }
      }
    }
    goFirst++;

  }
  alert(winner + "wins")
  playAgain();
}

function uTurn() {
  let row = parseInt(prompt("enter row"));
  let col = parseInt(prompt("enter column"));
  boardValues[row][col] = "x";
  alert(showBoard());
  return;
}

function cTurn() {
  if (defenseCheckR()) return true;
  else if (defenseCheckC()) return true;
  else if (defenseDiag()) return true;
  else if (randomMove()) return true;
  else return false;
  showBoard();
}

function defenseCheckR() {
  return false;
}

function defenseCheckC() {
  return false;
}

function defenseDiag() {
  return false;
}

function detectWinR() {
  let os = 0;
  let xs = 0;
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (boardValues[row][col] == "o") {
        os++;
      }
      if (boardValues[row][col] == "x") {
        xs++;
      }
    }
    if (os == 3) {
      winner = "o";
      return true;
    }
    if (xs == 3) {
      winner = "x";
      return true;
    }
    else return false;
  }
}

function detectWinC() {
  let os = 0;
  let xs = 0;
  for (let col = 0; col < 3; col++) {
    for (let row = 0; row < 3; row++) {
      if (boardValues[row][col] == "o") {
        os++;
      }
      if (boardValues[row][col] == "x") {
        xs++;
      }
    }
    if (os == 3) {
      winner = "o";
      return true;
    }
    if (xs == 3) {
      winner = "o";
      return true;
    }
    else return false;
  }
}

/* function defenseCheckR() {
  let os = 0;
  let xs = 0;
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (boardValues[row][col] == "o") {
        os++;
      }
      if (boardValues[row][col] == "x") {
        xs++;
      }
    }
    if (os == 2 && xs == 2) {
      if (os + xs == 3) {
        row++;
      }
      else {
        fillGapH(row);
      }
    }
  }
  return true;
}

function defenseCheckC() {
  let xs = 0;
  let os = 0;
  for (let col = 0; col < 3; col++) {
    for (let row = 0; row < 3; row++) {
      if (boardValues[row][col] == "o") {
        os++;
      }
      if (boardValues[row][col] == "x") {
        xs++;
      }
    }
    if (os == 2 && xs == 2) {
      if (os + xs == 3) {
        col++;
      }
      else {
        fillGapV(col);
      }
    }
  }
  return false;
}

function defenseDiag(slashIndex) {
  let os = 0;
  let flatBoard = boardValues.flat();
  boardValues.forEach(defenseDiag(fSlash));
  if (os > 1);
  os = 0;
  boardValues.forEach(defenseDiag(bSlash));
  if (os > 1);
  os = 0;
  if (flatBoard[slashIndex] == "o") {
    os++;
  }
  else if (flatBoard[slashIndex] == "x") {
    xs++;
  }
  else {
    slashIndex++;
    defenseDiag(slashIndex);
  }
}

function fillGapH(row) {
  if (col < 3) {
    if (boardValues[row][col] == "_") {
      boardValues[row][col] = "o";
    }
    else {
      col++;
      fillGapH();
    }
  }
}

function fillGapV(col) {
  if (row < 3) {
    if (boardValues[row][col] == "_") {
      boardValues[row][col] = "o";
    }
    else {
      row++;
      fillGapV();
    }
  }
}

function fillGapD(slashIndex) {
  let os = 0;
  boardValues.forEach(defenseDiag(fSlash));
  if (os > 1);
  os = 0;
  boardValues.forEach(defenseDiag(bSlash));
  if (os > 1);
  os = 0;
  if (flatBoard[slashIndex] == "_") {
    flatBoard[slashIndex] = "o";
  }
  else {
    row++
    fillGapD(slashIndex);
  }
} */

function randomMove() {
  let blanks = [];
  for (let col = 0; col < 3; col++) {
    for (let row = 0; row < 3; row++) {
      if (boardValues[row][col] == "_") {
        blanks.push([row, col]);
      }
    }
  }
  if (blanks == 0) {
    return false;
  }
  else {
    let which = Math.floor(Math.random() * blanks.length);
    let row = blanks[which][0];
    let col = blanks[which][1];
    boardValues[row][col] = "o";
    return true;
  }
}