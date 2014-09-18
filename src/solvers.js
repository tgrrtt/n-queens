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
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};


window.generateAllPossibleBoards = function(n){
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
          results.push(subBoard);
        }
      }
    }
    return results;
  };
  return generateAllPossibleSubBoards(n, n);
};

