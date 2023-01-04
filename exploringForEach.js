var boardValues = [["x","_","_"],["_","_","_"],["_","_","x"]];
var fSlash = [2, 4, 6];
var bSlash = [0, 4, 8];
var boardDict = [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]];

alert("Defense Diag fSlash: ", defenseDiag(fSlash));
alert("Defense Diag bSlash: ", defenseDiag(bSlash));




function defenseDiag(items) {
  let flatBoard = boardValues.flat();
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
      console.log("X at " + boardDict[item] + " at " + index + " in "+ arr);
    }
    else if (flatBoard[item] == "_") {
      open = item;
       console.log("_ at " + boardDict[item] + " at " + index + " in "+ arr);
    }
  }
  function fillGapD(item) {
    let toFill = boardDict[item];
    boardValues[toFill[0]][toFill[1]] = "o";
    console.log("o at " + toFill);
  }
}



// let students = ['John', 'Sara', 'Jack'];
// students.forEach(myFunction);

// function myFunction(item, index, arr) {

//     // adding strings to the array elements
//     arr[index] = 'Hello ' + item;
// }