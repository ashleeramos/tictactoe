var boardValues = [];
var winner = "";
var fSlash = [2, 4, 6];
var bSlash = [0, 4, 8];
var boardDict = [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]]

function makeBoard() {
  for (let row = 0; row < 3; row++) {
    boardValues.push([]);
    for (let col = 0; col < 3; col++) {
      boardValues[row][col] = "_";
    }
  }
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
    showBoard();
    if (goFirst % 2 == 0) {
      if (cTurn() == true) {
        if (detectWinR() == true) {
          winner = "cpu";
          gameOver = true;
        }
        else if (detectWinC() == true) {
          winner = "cpu";
          gameOver = true;
        }
        else {
          winner = "nobody";
        }
      }
    }
    else if (goFirst % 2 > 0) {
      if (uTurn() == true) {
        if (detectWinR() == true) {
          winner = "user";
          gameOver = true;
        }
        else if (detectWinC() == true) {
          winner = "user";
          gameOver = true;
        }
      }
      else {
        winner = "nobody";
        break;
      }
    }
    goFirst++;
  }
  alert(winner + " wins")
  // playAgain();
}

function uTurn() {
  let row = parseInt(prompt("enter row"));
  let col = parseInt(prompt("enter column"));
  if (row > 2) {
    return false;
  }
  else {
    boardValues[row][col] = "x";
    return true;
  }
}

function cTurn() {
  if (defenseCheckR()) return true;
  else if (defenseCheckC()) return true;
  else if (defenseDiag(fSlash)) return true;
  else if (defenseDiag(bSlash)) return true;
  else if (randomMove()) return true;
}

/* function defenseCheckR() {
  return false;
} */

/* function defenseCheckC() {
  return false;
} */

/* function defenseDiag() {
  return false;
} */

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
    else if (xs == 3) {
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
      alert(winner + " won");
      return true;
    }
    else if (xs == 3) {
      winner = "x";
      alert(winner + " won");
      return true;
    }
    else return false;
  }
}

function defenseCheckR() {
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
    if (os == 2 || xs == 2) {
      if (os + xs == 3) {
        row++;
      }
      else {
        fillGapH(row);
        return true;
      }
    }
  }
  return false;
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
    if (os == 2 || xs == 2) {
      if (os + xs == 3) {
        col++;
      }
      else {
        fillGapV(col);
        return true;
      }
    }
  }
  return false;
}

function defenseDiag(slashItems) {
  let flatBoard = boardValues.flat();
  let xs = 0;
  let open = -1;
  let slashItem = -1;
  slashItems.forEach(defenseDiagForEach);
  if (xs == 2 && open > -1) {
    fillGapD(slashItem);
  }
  else {
    return false;
  }
  function defenseDiagForEach(slashItem) {
    if (flatBoard[slashItem] == "x") {
      xs++;
      console.log(boardDict[slashItem]);
    }
    else if (flatBoard[slashItem] == "_") {
      open = slashItem;
    }
  }
  function fillGapD(slashItem) {
    let toFill = boardDict[slashItem];
    boardValues[toFill[0]][toFill[1]] = "x";
    return true;
  }
}

function fillGapH(row) {
  let col = 0;
  while (col < 3) {
    if (boardValues[row][col] == "_") {
      boardValues[row][col] = "o";
    }
    else {
      col++;
    }
  }
}


function fillGapV(col) {
  let row = 0;
  while (row < 3) {
    if (boardValues[row][col] == "_") {
      boardValues[row][col] = "o";
    }
    else {
      row++;
    }
  }
}


function randomMove() {
  let blanks = [];
  for (let col = 0; col < 3; col++) {
    for (let row = 0; row < 3; row++) {
      if (boardValues[row][col] == "_") {
        // alert(row + "," + col);
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