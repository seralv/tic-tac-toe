const MakeBoard = (function () {
  let board = [];
  let currentPlayer = null;
  function showBoard() {
    let counter = 0;
    for (let x = 0; x < 3; x++) {
      let row = []; // Crear una variable para acumular los valores de la fila

      // Recorremos las columnas
      for (let y = 0; y < 3; y++) {
        row.push(board[counter]); // Agregar el valor de counter a la fila
        counter++;

        // Agregar un espacio si no es el último valor de la fila
        // if (y < 2) {
        //   row += " ";
        // }
      }
      console.log(row); // Imprimir la fila
    }
  }
  return {
    generate: function () {
      // let counter = 0;
      for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
          // board.push(counter++);
          board.push(" ");
        }
      }
      showBoard();
    },
    updateBoard: function (space, figure) {
      if (board[space] === " ") {
        board[space] = figure;
        // console.log("currentPlayer:", currentPlayer);
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
      const checkLine = (line) => line.every(value => value !== " " && value === line[0]);

      const lines = [
        [board[0], board[1], board[2]],  // Line 1
        [board[3], board[4], board[5]],  // Line 2
        [board[6], board[7], board[8]],  // Line 3
        [board[0], board[3], board[6]],  // Column 1
        [board[1], board[4], board[7]],  // Column 2
        [board[2], board[5], board[8]],  // Column 3
        [board[0], board[4], board[8]],  // Diagonal 1
        [board[6], board[4], board[2]],  // Diagonal 2
      ];

      const winner = lines.some(checkLine);

      if (winner) {
        console.log(`${currentPlayer.playerName.toUpperCase()} WINS THE GAME`);
        return;
      }

      const isBoardFull = board.every(cell => cell !== " ")

      if (isBoardFull) {
        console.log("IT'S A TIE!!!")
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
    turnGame: function (space) {
      if (this.turn) {
        console.log(`${this.playerName}'s turn`)
        MakeBoard.updateBoard(space, this.figure);
      } else {
        console.log(`${this.playerName}, it's not your turn!`);
      }
    },
  };
}

const firstPlayer = createPlayer("Sergio", "X", true);
const secondPlayer = createPlayer("Luciana", "O", false);

const players = [firstPlayer, secondPlayer];

MakeBoard.generate();
firstPlayer.turnGame(2);
secondPlayer.turnGame(4);
firstPlayer.turnGame(6);
secondPlayer.turnGame(0);
firstPlayer.turnGame(8);
secondPlayer.turnGame(7)
firstPlayer.turnGame(3);
secondPlayer.turnGame(5)
firstPlayer.turnGame(1);
