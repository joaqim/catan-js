var io;
var gameSocket;

exports.initGame = function (sio, socket) {
  io = sio;
  gameSocket = socket;
  gameSocket.emit("connected", { message: "You are connected!" });

  // Host Events
  gameSocket.on("hostCreateNewGame", hostCreateNewGame);
  gameSocket.on("hostRoomFull", hostPrepareGame);
  //gameSocket.on("hostNextRound", hostNextRound);

  // Player Events
  gameSocket.on("playerJoinGame", playerJoinGame);
};

function hostCreateNewGame() {
  var thisGameId = (Math.random() * 1000) | 0;
  // Return the Room ID (gameId) and the socket ID (mySocketId) to the browser client
  this.emit("newGameCreated", { gameId: thisGameId, mySocketId: this.id });

  // Join the Room and wait for the players
  this.join(thisGameId.toString());
}
/*
 * Two players have joined. Alert the host!
 * @param gameId The game ID / room ID
 */

function hostPrepareGame(gameId) {
  var sock = this;
  var data = {
    mySocketId: sock.id,
    gameId: gameId,
  };
  //console.log("All Players Present. Preparing game...");
  io.sockets.in(data.gameId).emit("beginNewGame", data);
}

function playerJoinGame(data) {
  //console.log('Player ' + data.playerName + 'attempting to join game: ' + data.gameId );

  // A reference to the player's Socket.IO socket object
  var sock = this;

  // Look up the room ID in the Socket.IO manager object.
  var room = gameSocket.manager.rooms["/" + data.gameId];

  // If the room exists...
  if (room != undefined) {
    // attach the socket id to the data object.
    data.mySocketId = sock.id;

    // Join the room
    sock.join(data.gameId);

    //console.log('Player ' + data.playerName + ' joining game: ' + data.gameId );

    // Emit an event notifying the clients that the player has joined the room.
    io.sockets.in(data.gameId).emit("playerJoinedRoom", data);
  } else {
    // Otherwise, send an error message back to the player.
    this.emit("error", { message: "This room does not exist." });
  }
}
