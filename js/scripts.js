"use strict";


//jQuery
$( document ).ready(function() {
  //Make an SVG Container
  var game = new Game;
  var board = game.board;
  var spaces = board.spaces;


  var svgContainer = d3.select("#play-board").append("svg")
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

  var pieces = $('#play-board').children().find('rect');
  var textpieces = $('#play-board').children().find('text');

  pieces.on('click', function(event) {
    event.preventDefault();
    var piece = event.target.id;
    var turn = game.turn[0];
    var playerTurn = game.turn[1];
    // var gameOver = game.gameOver();
    if (spaces[piece].checkMark === null) {
      spaces[piece].mark(playerTurn)
      $("#text" + piece).text(playerTurn.mark);
      playerTurn = game.turn[1];
      var gameOver = game.gameOver(spaces[piece], playerTurn)
      game.takeTurn();
    } else {
      alert("That space is already taken");
      var gameOver = game.gameOver(spaces[piece], playerTurn)
    }
  if (gameOver[0]) {
    alert("Game Over " + gameOver[1].mark + " wins!");
    game = new Game;
  }
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
function Space(index, coordinates, mark) {
  this.coordinates = coordinates;
  this.xCoordinate = coordinates[0];
  this.yCoordinate = coordinates[1];
  this.checkMark = mark;
  this.boardIndex = index;
};

Space.prototype.mark = function(player) {
  var mark = player.mark;
  this.player = player
  this.checkMark = player.mark;
};

// BOARD
function Board() {
  this.spaces = [];
  var i = 0;
  for (var y = 1; y <= 3; y++) {
    for(var x = 1; x <= 3; x++) {
      this.spaces.push(new Space(i, [x, y], null));
      i++;
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

Board.prototype.gameOver = function(space, player) {
  var playerMark = player.mark;
  var win = false, horizontalWin = false, verticalWin = false, positiveDiagWin = false, negativeDiagWin = false;
  var horizontalMarks = [], verticalMarks = [], positiveDiagMarks = [], negativeDiagMarks = [];


  if (playerMark = space.checkMark) {
    for(var horizontal = space.boardIndex-2; horizontal <= 2; horizontal += 1) {
      if (!horizontalWin) {
        horizontalWin = checkSpaces(this, horizontal, horizontalMarks, playerMark);
      }
    }
    for(var vertical = space.boardIndex-6; vertical <= 8; vertical += 3) {
      if (!verticalWin) {
        verticalWin = checkSpaces(this, vertical, verticalMarks, playerMark);
      }
    }
    for(var positiveDiag = space.boardIndex-8; positiveDiag <= 8; positiveDiag += 4) {
      if (!positiveDiagWin) {
        positiveDiagWin = checkSpaces(this, positiveDiag, positiveDiagMarks, playerMark);
      }
    }
    for(var negativeDiag = space.boardIndex-6; negativeDiag <= 6; negativeDiag += 2) {
      if (!negativeDiagWin) {
        negativeDiagWin = checkSpaces(this, negativeDiag, negativeDiagMarks, playerMark);
      }
    }
  }

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
    turn[1] = this.player2;
  }
}

Game.prototype.gameOver = function(space) {
  if (this.board.gameOver(space, this.turn[1])) {
    return [true, this.turn[1]]
  } else {
    return [false];
  }
}
