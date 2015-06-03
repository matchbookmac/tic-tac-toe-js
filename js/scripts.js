"use strict";


//jQuery
$( document ).ready(function() {
  //Make an SVG Container
  var game = new Game;
  var board = game.board;
  var spaces = board.spaces;


  var svgContainer = d3.select("#board").append("svg")
                                      .attr("width", 440)
                                      .attr("height", 440)
                                      .attr("fill", "blue");

  //Draw the Rectangle
  var y = 10;
  var counter = 0;
  for (var i = 1 ; i <= 3; i++) {
    var x = 10;
    for (var j = 1; j <= 3; j++) {
      var spaceUnit = svgContainer.append("g")

      var rectangle = spaceUnit.append("rect")
                                  .attr("x", x)
                                  .attr("y", y)
                                  .attr("width", (400/3))
                                  .attr("height", (400/3))
                                  .attr("fill", "red")
                                  .attr("id", counter);

      var text = spaceUnit.append("text")
                                  .attr("x", x + 10)
                                  .attr("y", y + 10)
                                  .attr("dy", 105)
                                  .attr("dx", 15)
                                  .attr("width", (400/3))
                                  .attr("height", (400/3))
                                  .attr("id", "text" + counter)
                                  .attr("font-size", "9em")
                                  .text("");
      x += (400/3) + 10;
      counter += 1;
    }
    y += (400/3) + 10;
  }

  var pieces = $('#board').children().find('rect');
  var textpieces = $('#board').children().find('text');

  pieces.on('click', function(event) {
    var piece = event.target.id;
    var turn = game.turn[0]
    var playerTurn = game.turn[1]
    event.preventDefault()
    spaces[piece].mark(playerTurn)
    game.takeTurn;
    $("#text" + piece).text(playerTurn.mark);
  });
});


//raw js
// PLAYER
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

// SPACE
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

// BOARD
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

// GAME
function Game() {
  this.player1 = new Player("X")
  this.player2 = new Player("O")
  this.players = [this.player1, this.player2]
  this.board = new Board()
  this.turn = [0, this.player1]
}

Game.prototype.takeTurn = function() {
  var turn = this.turn;
  this.turn[0] += 1;
  if (turn[0] % 2 ===0) {
    turn[1] = this.player1;
  } else {
    turn[1] = this.player2
  }
}

Game.prototype.gameOver = function() {
  if (this.board.gameOver) {
    return [true, this.turn[1]]
  }
}
