describe('Player', function() {
  describe('mark', function() {
    it("returns the player's mark", function() {
      var player = new Player("X");
      expect(player.mark).to.equal("X");
    });
  });
});

describe('Space', function(){
  it("knows its coordinates", function() {
    var testSpace = new Space([1, 1], null)
    expect(testSpace.coordinates).to.eql([1, 1])
  });

  it("can be marked X or O", function(){
    var testSpace = new Space([1, 1], null)
    var player = new Player("X");
    testSpace.mark(player)
    expect(testSpace.checkMark).to.equal("X")
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
  it("should find a space by coordinates", function() {
    var board = new Board();
    expect(board.findSpace([2, 1])).to.eql(board.spaces[1]);
  });
  it("should be able to tell if there are three in a row marked by the same player", function(){
    var board = new Board();
    var player = new Player("X");
    board.spaces[0].mark(player);
    board.spaces[1].mark(player);
    board.spaces[2].mark(player);
    expect(board.gameOver(player)).to.eql(true);
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
});
