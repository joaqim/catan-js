class Bank {
  constructor() {}
}

class Player {
  constructor(name, index) {
    this.name = name;
    this.index = index;
  }
}

function Tile(resource, number, index) {
  this.resource = resource;
  this.number = number;
  this.index = index;
}

//@depends ./roll.js
function Board(numPlayers) {
  this.tiles = [];
  this.harbors = [];
  this.numPlayers = numPlayers;
  this.turn = 1;

  this.bank = {
    knight: 13,
    buildRoad: 2,
    monopoly: 2,
    plenty: 1,
    victoryPoint: 5,

    brick: 19,
    sheep: 19,
    stone: 19,
    wheat: 19,
    wood: 19,
  };

  this.players = Array.from({ length: this.numPlayers }, (_v, i) => {
    new Player("Player " + i, 1);
  });

  this.dice = 0;

  this.nodes = [];
  this.edges = [];
  this.adjacency = [];

  /*
  initialize();
  plotBoard();
  roll();
  tradePlayer(fromPlayer, toPlayer, fromResource, toResource, numFrom, numTo);
  tradeBank(player, fromResource, vars);
  placeStructure(player, structure, position);
  useDevelopment(player, card);
  moveBandit(destination, byPlayer, toPlayer);
  distribute(roll);
  computeVP(player);
  */
}
