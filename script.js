var boardValues = [];

function makeBoard() {
  for (let row = 0; row < 3; row++) {
    boardValues.push([]);
    for (let col = 0; col < 3; col++) {
      boardValues[row][col] = "_";
    }
  }
  showBoard();
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

function newGame(){
  let gameOver = false;
  let goFirst = Math.floor(Math.random() * 2)
  while (gameOver == false){
    showBoard();
    if (goFirst % 2 == 0){
      if (cTurn() == true){
        if (detectWin() == true){
          winner = "cpu";
          gameOver = true;
        }
      }
      else {
        winner = "nobody";
      }
    }
    else {
      if (uTurn() == true){
        if (detectWin() == true){
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

function uTurn(){
  let row = prompt("enter row");
  let col = prompt("enter column");
  alert (showBoard());
  return;
}

function cTurn(){
  if (defenseCheckR()) return true;
  else if (defenseCheckC()) return true;
  else if (defenseDiag()) return true;
  else if (fillSpace()) return true;
  else return false;
}

function detectWin(){
  let row = 0;
  let col = 0;
  let xs = 0;
  let os = 0;
  let winner = "";

  for (let row = 0; row < 3; row++){
    for (let col = 0; col < 3; col++){
      if (boardValues[row][col] == "x"){
        xs++;
      }
      if (boardValues[row][col] == "o"){
        os++;
      }
    }
    if (xs == 3){
      winner = "x";
      return true;
    }
    else return false;
    if (os == 3){
      winner = "o";
      return true;
    }
    else return false;
  }
}

function defenseCheckR(){
  for (let row = 0; row < 3; row++){
    for (let col = 0; col < 3; col++){
      if (boardValues[row][col] == "x"){
        xs++;
      }
      if (boardValues[row][col] == "o"){
        os++;
      }
    }
    if (xs == 2){
      if (xs + os) {

      }
    }
    else if (os == 2){
    }
  }
}