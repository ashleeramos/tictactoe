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
  boardValues[0][0] = "x";
  boardValues[1][0] = "x";
  boardValues[2][0] = "x";
  showBoard();
  if (detectWinC()) alert(winner);
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
  let goFirst = Math.floor(Math.random() * 2)
  while (gameOver == false) {
    showBoard();
    if (goFirst % 2 == 0) {
      if (cTurn() == true) {
        if (detectWinR() == true) {
          winner = "cpu";
          gameOver = true;
        }
      }
      else {
        winner = "nobody";
      }
    }
    else {
      if (uTurn() == true) {
        if (detectWinR() == true) {
          winner = "user";
          gameOver = true;
        }
      }
      else {
        winner = "nobody";
      }
    }
  }
  alert(winner + "wins")
  playAgain();
}

function uTurn() {
  let row = prompt("enter row");
  let col = prompt("enter column");
  alert(showBoard());
  return;
}

function cTurn() {
  let xs = 0;
  let os = 0;
  if (defenseCheckR()) return true;
  else if (defenseCheckC()) return true;
  let flatBoard = boardValues.flat();
  os = 0;
  boardValues.forEach(defenseDiag(fSlash));
  if (os > 1) alert("deal with a fSlash diag threat");
  os = 0;
  boardValues.forEach(defenseDiag(bSlash));
  if (os > 1) alert("deal with a bSlash diag threat");
  else if (fillSpace()) return true;
  else return false;
// end of cTurn function definition.  Below are component functions
  function defenseDiag(slashIndex) {
    if (flatBoard[slashIndex] == "o"){
      os++;
    }
  }
}

function detectWinR() {
  let xs = 0;
  let os = 0;
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (boardValues[row][col] == "x") {
        xs++;
      }
      if (boardValues[row][col] == "o") {
        os++;
      }
    }
    if (xs == 3) {
      winner = "x";
      return true;
    }
    else return false;
    if (os == 3) {
      winner = "o";
      return true;
    }
    else return false;
  }
}

function detectWinC() {
  let xs = 0;
  let os = 0;

  for (let col = 0; col < 3; col++) {
    for (let row = 0; row < 3; row++) {
      if (boardValues[row][col] == "x") {
        xs++;
      }
      if (boardValues[row][col] == "o") {
        os++;
      }
    }
    if (xs == 3) {
      winner = "x";
      return true;
    }
    else return false;
    if (os == 3) {
      winner = "o";
      return true;
    }
    else return false;
  }
}

function defenseCheckR() {
  let xs = 0;
  let os = 0;
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (boardValues[row][col] == "x") {
        xs++;
      }
      if (boardValues[row][col] == "o") {
        os++;
      }
    }
    if (xs == 2 && os == 2) {
      if (xs + os == 3) {
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
      if (boardValues[row][col] == "x") {
        xs++;, index, 
      }
      if (boardValues[row][col] == "o") {
        os++;
      }
    }
    if (xs == 2 && os == 2) {
      if (xs + os == 3) {
        col++;
      }
      else {
        fillGapV(col);
      }
    }
  }
  return true;
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
      fillGapH();
    }
  }
}
