const MakeBoard = (function () {
  let board = [];
  let currentPlayer = null;
  let displayBoard = document.getElementById("board");
  let resetBtn = document.getElementById("reset-btn");
  let spaceName = document.getElementById("namePlayer");
  const players = [];
  function showBoard() {
    let counter = 0;
    for (let x = 0; x < 3; x++) {
      let row = [];

      for (let y = 0; y < 3; y++) {
        row.push(board[counter]);
        counter++;
      }
      console.log(row); // Print row
    }
  }
  return {
    generate: function () {
      displayBoard.style.display = "grid";
      resetBtn.style.display = "inline";
      for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
          board.push(" ");
        }
      }
      showBoard();
    },
    updateBoard: function (space, figure) {
      if (board[space] === " ") {
        board[space] = figure;
        showBoard();
        this.verifyBoard();
        this.toggleTurn();
      } else {
        console.log("The space is full, change your option");
      }
    },
    toggleTurn: function () {
      players.forEach((player) => {
        player.turn = !player.turn;
        if (player.turn) {
          currentPlayer = player;
        }
      });
    },
    verifyBoard: function () {
      const checkLine = (line) =>
        line.every((value) => value !== " " && value === line[0]);

      const lines = [
        [board[0], board[1], board[2]], // Line 1
        [board[3], board[4], board[5]], // Line 2
        [board[6], board[7], board[8]], // Line 3
        [board[0], board[3], board[6]], // Column 1
        [board[1], board[4], board[7]], // Column 2
        [board[2], board[5], board[8]], // Column 3
        [board[0], board[4], board[8]], // Diagonal 1
        [board[6], board[4], board[2]], // Diagonal 2
      ];

      const winner = lines.some(checkLine);

      if (winner) {
        console.log(`${currentPlayer.playerName.toUpperCase()} WINS THE GAME`);
        return;
      }

      const isBoardFull = board.every((cell) => cell !== " ");

      if (isBoardFull) {
        console.log("IT'S A TIE!!!");
      }
    },
    verifyPlayers: function (nameFirstPlayer, nameSecondPlayer) {
      if (nameFirstPlayer !== "" && nameSecondPlayer !== "") {
        // spaceName.textContent = `${nameFirstPlayer}'s turn`;
        const firstPlayer = createPlayer(nameFirstPlayer, "X", true);
        const secondPlayer = createPlayer(nameSecondPlayer, "O", false);
        players.push(firstPlayer, secondPlayer);
        MakeBoard.generate();
      } else {
        spaceName.textContent = "We need both names of players";
      }
    },
    playGame: function (space) {
      players.forEach((player) => {
        if (player.turn) {
          currentPlayer = player;
          MakeBoard.turnGame(space);
        }
      });
    },
    turnGame: function (space) {
      if (currentPlayer.turn) {
        console.log(`${currentPlayer.playerName}'s turn`);
        MakeBoard.updateBoard(space, currentPlayer.figure);
      } else {
        console.log(`${playerName}, it's not your turn!`);
      }
    },
  };
})();

function createPlayer(playerName, figure, turn) {
  return {
    playerName: playerName,
    figure: figure,
    turn: turn,
    // turnGame: function (space) {
    //   if (this.turn) {
    //     console.log(`${this.playerName}'s turn`);
    //     MakeBoard.updateBoard(space, this.figure);
    //   } else {
    //     console.log(`${this.playerName}, it's not your turn!`);
    //   }
    // },
  };
}

document.getElementById("start-btn").addEventListener("click", function () {
  const nameFirstPlayer = document.getElementById("playerOne").value.trim();
  const nameSecondPlayer = document.getElementById("playerTwo").value.trim();
  MakeBoard.verifyPlayers(nameFirstPlayer, nameSecondPlayer);
});

const space0 = document.getElementById("space0");
space0.addEventListener("click", function () {
  MakeBoard.playGame(0);
  space0.textContent = "X";
});

function resetPage() {
  location.reload();
}
document.getElementById("reset-btn").addEventListener("click", resetPage);

// MakeBoard.generate();
// firstPlayer.turnGame(2);
// secondPlayer.turnGame(4);
// firstPlayer.turnGame(6);
// secondPlayer.turnGame(0);
// firstPlayer.turnGame(8);
// secondPlayer.turnGame(7);
// firstPlayer.turnGame(3);
// secondPlayer.turnGame(1);
