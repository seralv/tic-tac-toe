const MakeBoard = (function () {
  let board = [];
  let currentPlayer = null;
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
    updateBoard: function (spaceX, spaceY, figure) {
      if (board[spaceX][(spaceX, spaceY)] === " ") {
        board[spaceX][(spaceX, spaceY)] = figure;
        console.log("currentPlayer:", currentPlayer);
        showBoard();
        this.verifyBoard();
        this.toggleTurn(players);
      } else {
        console.log("The space is full, change your option");
      }
    },
    toggleTurn: function (players) {
      players.forEach((player) => {
        player.turn = !player.turn;
        if (player.turn) {
          currentPlayer = player;
        }
      });
    },
    verifyBoard: function () {
      for (let x = 0; x < board.length; x++) {
        let vertical = [];
        for (let y = 0; y < board.length; y++) {
          vertical.push(board[y][(y, x)]);
        }
        if (vertical.every((value) => value === value[x])) {
          console.log("vertical:", vertical);
        }
      }
      for (let i = 0; i < board.length; i++) {
        if (
          board[i].every((value) => value === board[i][(i, 0)] && value != " ")
        ) {
          console.log(
            `${currentPlayer.playerName.toUpperCase()} WINS THE GAME`,
          );
        }
      }
    },
  };
})();

function createPlayer(playerName, figure, turn) {
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
      } else {
        console.log(`${this.playerName}, it's not your turn!`);
      }
    },
  };
}

const firstPlayer = createPlayer("Bob", "X", true);
const secondPlayer = createPlayer("Tom", "O", false);

const players = [firstPlayer, secondPlayer];

MakeBoard.generate();
firstPlayer.turnGame(0, 1);
secondPlayer.turnGame(2, 0);
secondPlayer.turnGame(1, 2);
firstPlayer.turnGame(1, 1);
secondPlayer.turnGame(0, 2);
firstPlayer.turnGame(2, 1);
secondPlayer.turnGame(2, 2);
// firstPlayer.turnGame(0, 2);
// firstPlayer.turnGame(0, 0);
