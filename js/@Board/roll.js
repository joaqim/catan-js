Board.prototype.roll = function () {
  return Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + 2;
};
