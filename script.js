var boardValues = [];
var winner = "nobody";
var fSlash = [2, 4, 6];
var bSlash = [0, 4, 8];
var boardDict = [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]];
var gameOver = false;
var gameLog = [];

function makeBoard() {
  for (let row = 0; row < 3; row++) {
    boardValues.push([]);
    for (let col = 0; col < 3; col++) {
      boardValues[row][col] = "_";
    }
  }
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
  makeBoard();
  let turn = 0;
  let go = Math.floor(Math.random() * 2);
  if (go % 2 == 0) {
    turn++;
  }
  while (gameOver == false) {
    showBoard();
    if (turn % 2 == 0) {
      // alert("turn " + turn + " is cTurn");
      if (cTurn() == true) {
        detectWin("cpu");
        turn++;
      }
      else break;
    }
    else {
      // alert("turn " + turn + " is uTurn");
      if (uTurn() == true) {
        detectWin("user");
        turn++;
      }
      else break;
    }
    // new turn
  }
  alert(winner + " wins");
  playAgain();
}

function detectWin(player) {
  if (detectWinR() == true) {
    winner = player;
    gameOver = true;
  }
  else if (detectWinC() == true) {
    winner = player;
    gameOver = true;
  }
  else if (detectWinD(fSlash) == true) {
    winner = player;
    // alert("fSlash won");
    gameOver = true;
  }
  else if (detectWinD(bSlash) == true) {
    winner = player;
    // alert("bSlash won");
    gameOver = true;
  }
  else {
    winner = "problem";
  }
  return gameOver;
}



function uTurn() {
  let row = parseInt(prompt("enter row"));
  let col = parseInt(prompt("enter column"));
  if (row > 2) {
    alert(JSON.stringify(gameLog));
    return false;
  }
  else {
    boardValues[row][col] = "x";
    gameLog.push(row + "," + col + "= x");
    return true;
  }
}

function cTurn() {
  if (defenseCheckR()) return true;
  else if (defenseCheckC()) return true;
  else if (defenseDiag(fSlash)) return true;
  else if (defenseDiag(bSlash)) return true;
  else if (randomMove()) return true;
  else alert("no moves");
}

function detectWinR() {
  let os = 0;
  let xs = 0;
  let winFlag = false;
  for (let row = 0; row < 3; row++) {
    os = 0;
    xs = 0;
    for (let col = 0; col < 3; col++) {
      if (boardValues[row][col] == "o") {
        os++;
      }
      if (boardValues[row][col] == "x") {
        xs++;
      }
    }
    if (os == 3) {
      // winner = "o";
      winFlag = true;
    }
    else if (xs == 3) {
      // winner = "x";
      winFlag = true;
    }
    else return winFlag;
  }
}

function detectWinC() {
  let os = 0;
  let xs = 0;
  let winFlag = false;
  for (let col = 0; col < 3; col++) {
    os = 0;
    xs = 0;
    for (let row = 0; row < 3; row++) {
      if (boardValues[row][col] == "o") {
        os++;
      }
      else if (boardValues[row][col] == "x") {
        xs++;
      }
    }
    if (os == 3) {
      // winner = "o";
      winFlag = true;
    }
    else if (xs == 3) {
      // winner = "x";
      winFlag = true;
    }
  }
  return winFlag;
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
    if (os == 2) {
      if (os + xs == 3) {
        row++;
      }
      else {
        fillGapH(row);
        alert("cpu wins");
        return true;
      }
    }
    if (xs == 2) {
      if (os + xs == 3) {
        row++;
      }
      else {
        fillGapH(row);
        alert("row defense");
        return true;
      }
    }
    os = 0;
    xs = 0;
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
        alert("column defense");
        return true;
      }
    }
    os = 0;
    xs = 0;
  }
  return false;
}

function defenseDiag(items) {
  let flatBoard = boardValues.flat();
  let os = 0;
  let xs = 0;
  let open = -1;
  items.forEach(defenseDiagForEach);
  if (xs == 2 && open > -1) {
    fillGapD(open);
    return open;
  }
  else {
    return false;
  }
  function defenseDiagForEach(item, index, arr) {
    if (flatBoard[item] == "x") {
      xs++;
      // gameLog.push("x at " + boardDict[item] + " at " + index + " in " + arr);
    }
    else if (flatBoard[item] == "o") {
      os++;
    }
    else if (flatBoard[item] == "_") {
      open = item;
      // gameLog.push("_ at " + boardDict[item] + " at " + index + " in " + arr);
    }
  }
  function fillGapD(item) {
    let toFill = boardDict[item];
    boardValues[toFill[0]][toFill[1]] = "o";
    gameLog.push(toFill[0] + "," + toFill[1] + "= o");
    // gameLog.push("o at " + toFill);
  }
}

function detectWinD(items) {
  let flatBoard = boardValues.flat();
  let os = 0;
  let xs = 0;
  items.forEach(detectWinDForEach);
  // bSlash && fSlash
  if (os == 3 || xs == 3) {
    return true;
  }
  else return false;
  function detectWinDForEach(item) {
    if (flatBoard[item] == "o") {
      os++;
    }
    else if (flatBoard[item] == "x") {
      xs++;
    }
  }
}

function fillGapH(row) {
  let col = 0;
  while (col < 3) {
    if (boardValues[row][col] == "_") {
      boardValues[row][col] = "o";
      gameLog.push(row + "," + col + "= o");
      col = 3;
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
      gameLog.push(row + "," + col + "= o");
      row = 3;
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
    gameLog.push(row + "," + col + "= o");
    return true;
  }
}

function playAgain() {
  let again = confirm("would you like to play again?");
  if (again == true) {
    gameOver = false;
    alert(JSON.stringify(gameLog));
    newGame();
  }
  else return false;
}