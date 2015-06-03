describe('Player', function() {
  it("returns the player's mark", function() {
    var player = new Player("X");
    expect(player.mark).to.equal("X");
  });
});

describe('Space', function(){
  it("knows its coordinates", function() {
    var testSpace = new Space([1, 1], null)
    expect(testSpace.coordinates).to.eql([1, 1])
  });

  describe('mark', function() {
    it("can be marked X or O", function(){
      var testSpace = new Space([1, 1], null)
      var player = new Player("X");
      testSpace.mark(player)
      expect(testSpace.checkMark).to.equal("X")
    });
  });
});

describe('Board', function() {
  it("should be created with 9 spaces", function(){
    var board = new Board();
    expect(board.spaces.length).to.eql(9)
  });
  it("should return a specific space", function(){
    var board = new Board();
    var player = new Player("X");
    board.spaces[1].mark(player);
    expect(board.spaces[1].checkMark).to.eql("X")
    expect(board.spaces[1].coordinates).to.eql([2, 1])
  });

  describe('findSpace', function() {
    it("should find a space by coordinates", function() {
      var board = new Board();
      expect(board.findSpace([2, 1])).to.eql(board.spaces[1]);
    });
  });

  describe('gameOver', function() {
    it("should be able to tell if there are three in a row marked by the same player", function(){
      var board = new Board();
      var player = new Player("X");
      board.spaces[0].mark(player);
      board.spaces[1].mark(player);
      board.spaces[2].mark(player);
      expect(board.gameOver(player)).to.eql(true);
    });
  });
});

describe('Game', function() {
  it("should create 2 players and a board", function(){
    var game = new Game();
    expect(game.players.length).to.eql(2)
    expect(game.player1.mark).to.eql("X")
    expect(game.player2.mark).to.eql("O")
    expect(game.board.spaces.length).to.eql(9)
  });

  describe('takeTurn', function() {    
    it("should increment turn by one, and indicate which player's turn it is", function() {
      var game = new Game();
      game.takeTurn();
      expect(game.turn).to.eql([1, "O"]);
    });
  });

  describe("gameOver", function() {
    it("returns whether the game is won or not, and who won", function() {
      var game = new Game();
      var board = game.board;
      var player1 = game.player1;
      var player2 = game.player2;
      board.spaces[0].mark(player1);
      game.takeTurn();
      board.spaces[3].mark(player2);
      game.takeTurn();
      board.spaces[1].mark(player1);
      game.takeTurn();
      board.spaces[2].mark(player2);
      game.takeTurn();
      board.spaces[4].mark(player1);
      game.takeTurn();
      board.spaces[7].mark(player2);
      game.takeTurn();
      board.spaces[8].mark(player1);
      expect(game.gameOver()).to.eql([true, player1.mark]);
    });
  });
});
