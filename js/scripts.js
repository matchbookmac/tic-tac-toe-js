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

  //Draw the Board
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

////Game functions

  var pieces = $('#play-board').children().find('rect');

  pieces.on('click', function(event) {
    event.preventDefault();
    var piece = event.target.id;
    var turn = game.turn;
    var playerTurn = game.playerTurn;
    // var gameOver = game.gameOver();
    if (spaces[piece].checkMark === null) {
      spaces[piece].mark(playerTurn)
      $("#text" + piece).text(playerTurn.mark);
      playerTurn = game.playerTurn;
      var gameOver = game.gameOver(spaces[piece], playerTurn)
      game.takeTurn();
    } else {
      alert("That space is already taken");
      var gameOver = game.gameOver(spaces[piece], playerTurn)
    }
    if (gameOver.win) {
      alert("Game Over " + gameOver.winningPlayer.mark + " wins!");
      game = new Game;
      location.reload();
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
function Space(index, mark) {
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
  for (var i = 0; i <= 8; i++) {
      this.spaces.push(new Space(i, null));
    };

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
  this.turn = 0
  this.playerTurn = this.player1
}

Game.prototype.takeTurn = function() {
  this.turn += 1;
  var turn = this.turn;
  if (turn % 2 ===0) {
    this.playerTurn = this.player1;
  } else {
    this.playerTurn = this.player2;
  }
}

Game.prototype.gameOver = function(space) {
  if (this.board.gameOver(space, this.playerTurn)) {
    return { win: true, winningPlayer: this.playerTurn };
  } else {
    return { win: false };
  }
}
