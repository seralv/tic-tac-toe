const MakeBoard = (function () {
  let board = [];
  return {
    generate: function () {
      for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
          board.push(`[${x}, ${y}]`);
        }
      }
    },
  };
})();

const Game = (function () {
  // game code
})();

function createPlayer(playerName) {
  return {
    playerName: playerName,
    greeting: function () {
      console.log(`Hello I am ${this.playerName}`);
    },
  };
}

const firstPlayer = createPlayer("Bob");
const secondPlayer = createPlayer("Tom");

MakeBoard.generate();

firstPlayer.greeting();
secondPlayer.greeting();
