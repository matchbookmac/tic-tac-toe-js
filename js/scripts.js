"use strict";


//jQuery
$( document ).ready(function() {
    console.log( "jQuery Ready" );

    $("#jqtest").text('jQuery Ready')
});

//raw js
function Player(mark) {
  mark = mark.toUpperCase();
  if (mark === "X"){
    this.mark = "X"
  } else if (mark === "O"){
    this.mark = "O"
  } else {
    this.mark = null
  };
};

function Space(coordinates, mark) {
  this.coordinates = coordinates;
  this.xCoordinate = coordinates[0];
  this.yCoordinate = coordinates[1];
};

Space.prototype.mark = function(player) {
  var mark = player.mark;
  this.player = player
  this.checkMark = player.mark;
};

function Board() {
  this.spaces = [];
  for (var y = 1; y <= 3; y++) {
    for(var x = 1; x <= 3; x++) {
      this.spaces.push(new Space([x, y], null));
    };
  };
};

Board.prototype.findSpace = function(coordinates) {
  var length = this.spaces.length;
  for (var i = 0; i < length; i++) {
    if (this.spaces[i].coordinates[0] === coordinates[0] && this.spaces[i].coordinates[1] === coordinates[1]) {
      return this.spaces[i];
    }
  }
};

Board.prototype.gameOver = function(player) {
  var playerMark = player.mark;
  var win = false, horizontalWin = false, verticalWin = false, positiveDiagWin = false, negativeDiagWin = false;
  var horizontalMarks = [], verticalMarks = [], positiveDiagMarks = [], negativeDiagMarks = [];

  for(var space = 0; space < 9; space++) {
    if (playerMark = this.spaces[0].checkMark) {
      for(var horizontal = -2; horizontal <= 2; horizontal++) {
        if (!horizontalWin) {
          horizontalWin = checkSpaces(this, horizontal, horizontalMarks, playerMark);
        }
      }
      for(var vertical = -6; vertical <= 6; vertical += 3) {
        if (!verticalWin) {
          verticalWin = checkSpaces(this, vertical, verticalMarks, playerMark);
        }
      }
      for(var positiveDiag = -8; positiveDiag <= 8; positiveDiag += 4) {
        if (!positiveDiagWin) {
          positiveDiagWin = checkSpaces(this, positiveDiag, positiveDiagMarks, playerMark);
        }
      }
      for(var negativeDiag = -6; negativeDiag <= 6; negativeDiag += 2) {
        if (!negativeDiagWin) {
          negativeDiagWin = checkSpaces(this, negativeDiag, negativeDiagMarks, playerMark);
        }
      }
    }
  };

  if (horizontalWin || verticalWin || positiveDiagWin || negativeDiagWin) {
    win = true;
  }

  return win;
};

function checkSpaces(board, increment, marks, mark) {
  // var marks = [];
  var win = false;
  if (typeof board.spaces[increment] != "undefined" && board.spaces[increment].checkMark === mark) {
    marks.push(board.spaces[increment].checkMark);
  }
  if (marks.length === 3) {
    win = true;
  }
  return win;
};
