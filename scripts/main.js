const MakeBoard = (function () {
  let board = [];
  function showBoard() {
    console.log(board);
  }
  return {
    generate: function () {
      for (let x = 0; x < 3; x++) {
        let row = [];
        for (let y = 0; y < 3; y++) {
          // row.push(`[${x}, ${y}]`);
          row.push(" ")
        }
        board.push(row);
      }
      showBoard();
    },
    updateBoard: function(spaceX, spaceY, figure) {
      board[spaceX][spaceX, spaceY] = figure;
      showBoard();
    }
  };
})();

const Game = (function () {
  // game code
})();

function createPlayer(playerName, figure) {
  return {
    playerName: playerName,
    figure: figure,
    greeting: function () {
      console.log(`Hello I am ${this.playerName}`);
    },
    turnGame: function(spaceX, spaceY) {
      MakeBoard.updateBoard(spaceX, spaceY, figure);
    }
  };
}

const firstPlayer = createPlayer("Bob", "X");
const secondPlayer = createPlayer("Tom", "O");

MakeBoard.generate();
// MakeBoard.updateBoard(0,1,"X")
// MakeBoard.updateBoard(0,0,"O")
firstPlayer.turnGame(0, 1);
secondPlayer.turnGame(0, 0);
firstPlayer.turnGame(1, 1);
secondPlayer.turnGame(2, 1)
