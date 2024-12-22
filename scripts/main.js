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
          row.push(" ");
        }
        board.push(row);
      }
      showBoard();
    },
    updateBoard: function (spaceX, spaceY, figure, turn) {
      console.log("first player:", firstPlayer);
      console.log("second player:", secondPlayer);
      if (board[spaceX][(spaceX, spaceY)] === " ") {
        board[spaceX][(spaceX, spaceY)] = figure;
        showBoard();
      } else {
        console.log("The space is full, change your option");
      }
    },
  };
})();

const Game = (function () {
  // game code
})();

const TurnController = {
  currentPlayer: null,
  toggleTurn: function (players) {
    players.forEach((player) => {
      player.turn = !player.turn;
      if (player.turn) {
        this.currentPlayer = player;
      }
    });
  },
};

function createPlayer(playerName, figure, turn = false) {
  return {
    playerName: playerName,
    figure: figure,
    turn: turn,
    greeting: function () {
      console.log(`Hello I am ${this.playerName}`);
    },
    turnGame: function (spaceX, spaceY) {
      if (this.turn) {
        MakeBoard.updateBoard(spaceX, spaceY, this.figure, this.turn);
        TurnController.toggleTurn(players);
      } else {
        console.log(`It's not ${this.playerName}'s turn!`);
      }
    },
  };
}

const firstPlayer = createPlayer("Bob", "X");
const secondPlayer = createPlayer("Tom", "O");

const players = [firstPlayer, secondPlayer];

MakeBoard.generate();
firstPlayer.turnGame(0, 1);
secondPlayer.turnGame(0, 0);
firstPlayer.turnGame(1, 1);
secondPlayer.turnGame(2, 1);
firstPlayer.turnGame(0, 2);
secondPlayer.turnGame(2, 2);
firstPlayer.turnGame(0, 2);
firstPlayer.turnGame(2, 0);
