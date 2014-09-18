/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other


window.findNRooksSolution = function(n) {
  var possibleSolutions = generateAllPossibleBoards(n);
  for (var i = 0; i < possibleSolutions.length; i++) {
    var board = new Board(possibleSolutions[i]);
    if (!board.hasAnyRooksConflicts()) {
      var solution = board.attributes;
      console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
      return solution;
    }
  }
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;

  var possibleSolutions = generateAllPossibleBoards(n);
  for (var i = 0; i < possibleSolutions.length; i++) {
    var board = new Board(possibleSolutions[i]);
    // if (!board.hasAnyRooksConflicts()) {
      solutionCount++;
    // }
  }

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};




// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  if (n === 0) {
    return;
  } else if (n === 2 || n === 3) {
    return {'n': n};
  }
  return generateAllPossibleBoards(n, 'queen')[0];
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  if (n === 0){
    return 1;
  }
  var solutionCount = 0;

  var possibleSolutions = generateAllPossibleBoards(n, 'queen');
  for (var i = 0; i < possibleSolutions.length; i++) {
    var board = new Board(possibleSolutions[i]);
    solutionCount++;
  }

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};


window.generateAllPossibleBoards = function(n, queenOrRook){
  var possibleRows = [];
  var rowTemplate = [];
  var count = n;
  while (count > 0) {
    rowTemplate.push(0);
    count--;
  }
  for (var i = 0; i < n; i++){
    var row = rowTemplate.slice();
    row[i] = 1;
    possibleRows.push(row);
  }

  var anyColConflicts = function(arr) {
    for(var j = 0; j < arr[0].length; j++) {
      var count = 0;
      for (var i = 0; i < arr.length; i++) {
        count+= arr[i][j];
      }
      if (count > 1) {
        return true;
      }
    }
    return false;
  };

  var anyMajorDiagConflicts = function(arr, queenIdx){
    // check bottom right to top left

    if (arr.length === 1) {
      return false;
    }

    var currentRowIdx = arr.length - 2;
    var currentColIdx = queenIdx - 1;

    // decrementing while loop that starts at one less than length
    while (currentRowIdx >= 0 && currentColIdx >= 0){
      if (arr[currentRowIdx][currentColIdx] === 1) {
        return true;
      }
      currentRowIdx--;
      currentColIdx--;
    }
    return false;
  };

  var anyMinorDiagConflicts = function(arr, queenIdx){
    // check bottom left to top right

    if (arr.length === 1) {
      return false;
    }

    var currentRowIdx = arr.length - 2;
    var currentColIdx = queenIdx + 1;

    // decrementing while loop that starts at one less than length
    while (currentRowIdx >= 0 && currentColIdx < arr[0].length){
      if (arr[currentRowIdx][currentColIdx] === 1) {
        return true;
      }
      currentRowIdx--;
      currentColIdx++;
    }
    return false;
  };

  var generateAllPossibleSubBoards = function(cols, rows){
    var results = [];
    if (rows === 1){
      for (var i = 0; i < possibleRows.length; i++){
        results.push([possibleRows[i]]);
      }
      return results;
    }

    var possibleBoardsMinus1 = generateAllPossibleSubBoards(cols, rows-1);

    for (var i = 0; i < possibleBoardsMinus1.length; i++){
      for (var j = 0; j < possibleRows.length; j++){
        var subBoard = possibleBoardsMinus1[i].slice();
        var row = possibleRows[j];
        subBoard.push(row);
        if (!anyColConflicts(subBoard)) {
          if (queenOrRook === 'queen'){
            if (!anyMinorDiagConflicts(subBoard, j) && !anyMajorDiagConflicts(subBoard, j)){
              results.push(subBoard);
            }
          } else {
            results.push(subBoard);
          }
        }
      }
    }
    return results;
  };
  return generateAllPossibleSubBoards(n, n);
};

