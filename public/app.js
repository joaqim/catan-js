var IO = {
  init: function () {
    console.log("IO:init");
    IO.socket = io.connect();
    IO.bindEvents();
  },
  bindEvents: function () {
    IO.socket.on("connected", IO.onConnected);
    //IO.socket.on("newGameCreated", IO.onNewGameCreated);
    //IO.socket.on("playerJoinedRoom", IO.playerJoinedRoom);
    //IO.socket.on("beginNewGame", IO.beginNewGame);
    //IO.socket.on("newWordData", IO.onNewWordData);
    //IO.socket.on("hostCheckAnswer", IO.hostCheckAnswer);
    //IO.socket.on("gameOver", IO.gameOver);
    //IO.socket.on("error", IO.error);
  },
  onConnected: function () {
    // Cache a copy of the client's socket.IO session ID on the App
    App.mySocketId = IO.socket.socket.sessionid;
    console.log("Connected");
    //console.log(data.message);
  },
};

