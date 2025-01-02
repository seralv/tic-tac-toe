const MakeBoard = (function () {
  let board = [];
  let currentPlayer = null;
  let displayBoard = document.getElementById("board");
  let resetBtn = document.getElementById("reset-btn");
  let spaceName = document.getElementById("namePlayer");
  const players = [];

  // Show board in console
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

  // Verify if it has a line winner
  function checkLine(line) {
    return line.every((value) => value !== " " && value === line[0]);
  }

  // Main verify board
  function verifyBoard() {
    const lines = [
      [board[0], board[1], board[2]], // Row 1
      [board[3], board[4], board[5]], // Row 2
      [board[6], board[7], board[8]], // Row 3
      [board[0], board[3], board[6]], // Column 1
      [board[1], board[4], board[7]], // Column 2
      [board[2], board[5], board[8]], // Column 3
      [board[0], board[4], board[8]], // Diagonal 1
      [board[6], board[4], board[2]], // Diagonal 2
    ];

    // Verify winner
    if (lines.some(checkLine)) {
      console.log(`${currentPlayer.playerName.toUpperCase()} WINS THE GAME`);
      spaceName.style.color = "#fd151b";
      spaceName.textContent = `${currentPlayer.playerName.toUpperCase()} WINS THE GAME`;
      displayBoard.style.pointerEvents = "none";
      return;
    }

    // Verify tie
    if (board.every((cell) => cell !== " ")) {
      console.log("IT'S A TIE!!!");
      spaceName.style.color = "#fd151b";
      spaceName.textContent = "IT'S A TIE";
      return;
    }

    toggleTurn(); // Cambiar turno si no hay ganador
  }

  // Change turn of players
  function toggleTurn() {
    players.forEach((player) => (player.turn = !player.turn));
    currentPlayer = players.find((player) => player.turn);
    spaceName.textContent = `${currentPlayer.playerName}'s turn`;
  }

  return {
    generate: function () {
      displayBoard.style.display = "grid";
      resetBtn.style.display = "inline";
      board = new Array(9).fill(" "); // Begin empty board
      // for (let x = 0; x < 3; x++) {
      //   for (let y = 0; y < 3; y++) {
      //     board.push(" ");
      //   }
      // }
      showBoard();
    },
    updateBoard: function (space, figure) {
      const currentSpace = document.getElementById(`space${space}`);
      console.log("space:", `space${space}`);
      if (board[space] === " ") {
        board[space] = figure;
        currentSpace.textContent = figure;
        showBoard();
        verifyBoard();
      } else {
        console.log("The space is full, change your option");
      }
    },
    // toggleTurn: function () {
    //   players.forEach((player) => {
    //     player.turn = !player.turn;
    //   });
    //   currentPlayer = players.find((player) => player.turn);
    //   spaceName.textContent = `${currentPlayer.playerName}'s turn`;
    // },
    // verifyBoard: function () {
    //   const checkLine = (line) =>
    //     line.every((value) => value !== " " && value === line[0]);
    //
    //   const lines = [
    //     [board[0], board[1], board[2]], // Line 1
    //     [board[3], board[4], board[5]], // Line 2
    //     [board[6], board[7], board[8]], // Line 3
    //     [board[0], board[3], board[6]], // Column 1
    //     [board[1], board[4], board[7]], // Column 2
    //     [board[2], board[5], board[8]], // Column 3
    //     [board[0], board[4], board[8]], // Diagonal 1
    //     [board[6], board[4], board[2]], // Diagonal 2
    //   ];
    //
    //   const winner = lines.some(checkLine);
    //
    //   if (winner) {
    //     console.log(`${currentPlayer.playerName.toUpperCase()} WINS THE GAME`);
    //     spaceName.style.color = "#fd151b";
    //     spaceName.textContent = `${currentPlayer.playerName.toUpperCase()} WINS THE GAME`;
    //     displayBoard.style.pointerEvents = "none";
    //     return;
    //   } else {
    //     this.toggleTurn();
    //   }
    //
    //   const isBoardFull = board.every((cell) => cell !== " ");
    //
    //   if (isBoardFull) {
    //     console.log("IT'S A TIE!!!");
    //     spaceName.style.color = "#fd151b";
    //     spaceName.textContent = "IT'S A TIE";
    //     return;
    //   }
    // },
    verifyPlayers: function (nameFirstPlayer, nameSecondPlayer) {
      // if (nameFirstPlayer !== "" && nameSecondPlayer !== "") {
      if (nameFirstPlayer && nameSecondPlayer) {
        const firstPlayer = createPlayer(nameFirstPlayer, "X", true);
        const secondPlayer = createPlayer(nameSecondPlayer, "O", false);
        players.push(firstPlayer, secondPlayer);
        currentPlayer = firstPlayer;
        spaceName.textContent = `${currentPlayer.playerName}'s turn`;
        this.generate();
      } else {
        spaceName.textContent = "We need both names of players";
      }
    },
    playGame: function (space) {
      this.updateBoard(space, currentPlayer.figure);
    },
  };
})();

// Create players factory
function createPlayer(playerName, figure, turn) {
  return { playerName, figure, turn };
  // return {
  //   playerName: playerName,
  //   figure: figure,
  //   turn: turn,
  // };
}

document.getElementById("start-btn").addEventListener("click", function () {
  const nameFirstPlayer = document.getElementById("playerOne").value.trim();
  const nameSecondPlayer = document.getElementById("playerTwo").value.trim();
  MakeBoard.verifyPlayers(nameFirstPlayer, nameSecondPlayer);
});

// Select choice in board
for (let i = 0; i < 9; i++) {
  document.getElementById(`space${i}`).addEventListener("click", function () {
    MakeBoard.playGame(i);
  });
}

// Function to reset the page for new game
function resetPage() {
  location.reload();
}
document.getElementById("reset-btn").addEventListener("click", resetPage);
