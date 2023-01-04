var boardValues = [["x", "_", "o"], ["_", "o", "_"], ["o", "_", "x"]];
var fSlash = [2, 4, 6];
var bSlash = [0, 4, 8];
var boardDict = [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]];

if (detectWinD(fSlash) == true) {
  winner = "cpu";
  alert("fSlash won");
  gameOver = true;
}
else if (detectWinD(bSlash) == true) {
  winner = "cpu";
  alert("bSlash won");
  gameOver = true;
}
else{
  alert("nobody won");
}


function detectWinD(items) {
  let flatBoard = boardValues.flat();
  let os = 0;
  items.forEach(detectWinDForEach);
  // bSlash && fSlash
  if (os == 3) {
    return true;
  }
  else return false;
  function detectWinDForEach(item) {
    if (flatBoard[item] == "o") {
      os++;
    }
  }
}

