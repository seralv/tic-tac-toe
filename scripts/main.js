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
      const currentSpace = document.getElementById(`space${space}`);
      console.log("space:", `space${space}`);
      if (board[space] === " ") {
        board[space] = figure;
        currentSpace.textContent = figure;
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
      });
      currentPlayer = players.find((player) => player.turn);
      spaceName.textContent = `${currentPlayer.playerName}'s turn`;
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
        spaceName.style.color = "#fd151b";
        spaceName.textContent = `${currentPlayer.playerName.toUpperCase()} WINS THE GAME`;
        displayBoard.style.pointerEvents = "none";
        return;
      }

      const isBoardFull = board.every((cell) => cell !== " ");

      if (isBoardFull) {
        console.log("IT'S A TIE!!!");
        spaceName.style.color = "#fd151b";
        spaceName.textContent = "IT'S A TIE";
      }
    },
    verifyPlayers: function (nameFirstPlayer, nameSecondPlayer) {
      if (nameFirstPlayer !== "" && nameSecondPlayer !== "") {
        // spaceName.textContent = `${nameFirstPlayer}'s turn`;
        const firstPlayer = createPlayer(nameFirstPlayer, "X", true);
        const secondPlayer = createPlayer(nameSecondPlayer, "O", false);
        players.push(firstPlayer, secondPlayer);
        currentPlayer = firstPlayer;
        spaceName.textContent = `${currentPlayer.playerName}'s turn`;
        MakeBoard.generate();
      } else {
        spaceName.textContent = "We need both names of players";
      }
    },
    playGame: function (space) {
      MakeBoard.updateBoard(space, currentPlayer.figure);
    },
  };
})();

function createPlayer(playerName, figure, turn) {
  return {
    playerName: playerName,
    figure: figure,
    turn: turn,
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
});

const space1 = document.getElementById("space1");
space1.addEventListener("click", function () {
  MakeBoard.playGame(1);
});

const space2 = document.getElementById("space2");
space2.addEventListener("click", function () {
  MakeBoard.playGame(2);
});

const space3 = document.getElementById("space3");
space3.addEventListener("click", function () {
  MakeBoard.playGame(3);
});

const space4 = document.getElementById("space4");
space4.addEventListener("click", function () {
  MakeBoard.playGame(4);
});

const space5 = document.getElementById("space5");
space5.addEventListener("click", function () {
  MakeBoard.playGame(5);
});

const space6 = document.getElementById("space6");
space6.addEventListener("click", function () {
  MakeBoard.playGame(6);
});

const space7 = document.getElementById("space7");
space7.addEventListener("click", function () {
  MakeBoard.playGame(7);
});

const space8 = document.getElementById("space8");
space8.addEventListener("click", function () {
  MakeBoard.playGame(8);
});

function resetPage() {
  location.reload();
}
document.getElementById("reset-btn").addEventListener("click", resetPage);
