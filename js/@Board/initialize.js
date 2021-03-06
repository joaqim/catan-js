//@depends ../Resource.js

Board.prototype.initialize = function () {
  // 20x
  numBrick = 3;
  numDesert = 1;
  numSheep = 4;

  numStone = 3;
  numWheat = 4;
  numWood = 4;

  resources = [];

  for (let i = 0; i < 19; i++) {
    assigned = false;
    while (!assigned) {
      let r = Math.floor(Math.random() * 6) + 1;
      switch (r) {
        case 1:
          if (numBrick-- > 0) {
            resources.push(Resource.brick);
            assigned = true;
          }
          break;
        case 2:
          if (numDesert-- > 0) {
            resources.push(Resource.desert);
            assigned = true;
          }
          break;
        case 3:
          if (numSheep-- > 0) {
            resources.push(Resource.sheep);
            assigned = true;
          }
          break;
        case 4:
          if (numStone-- > 0) {
            resources.push(Resource.stone);
            assigned = true;
          }
          break;
        case 5:
          if (numWheat-- > 0) {
            resources.push(Resource.wheat);
            assigned = true;
          }
          break;
        case 6:
          if (numWood-- > 0) {
            resources.push(Resource.wood);
            assigned = true;
          }
          break;
      }
    }
  }
  //console.log(JSON.stringify(resources, null, 2));
  // assignment starts with tile 1:
  assignment = [
    0,
    3,
    7,
    12,
    16,
    17,
    18,
    15,
    11,
    6,
    2,
    1,
    4,
    8,
    13,
    14,
    10,
    5,
    9,
  ];
  // The sequence of numbers corresponding to the assignment is as follows:
  numbers = [5, 2, 6, 3, 8, 10, 9, 12, 11, 4, 8, 10, 9, 4, 5, 6, 3, 11];
  counter = 0;
  for (let i = 0; i < 19; i++) {
    let tile = assignment[i];
    let resource = resources[tile];
    if (resource != Resource.desert) {
      this.tiles[tile] = new Tile(resource, numbers[counter], tile);
      counter++;
    } else this.tiles[tile] = new Tile(resource, 0, tile);
  }
};

/*
  function zeros(length) {
    return Array.apply(null, Array(length)).map(Number.prototype.valueOf, 0);
  }
  function vec_apply_multiply(vec, start, end, expr, subtr = 0) {
    for (let i = start; i < end; i++) vec.push(expr * i - subtr);
  }
   // Set tile centerpoints
  let x_start = [];
  let y_start = [];

  vec_apply_multiply(x_start, 0, 2, 2 * Math.sin(Math.PI / 3));
  vec_apply_multiply(y_start, 1, 3, 0);

  vec_apply_multiply(
    x_start,
    0,
    3,
    2 * Math.sin(Math.PI / 3),
    Math.sin(Math.PI / 3)
  );
  vec_apply_multiply(y_start, 1, 4, -1.5);

  vec_apply_multiply(
    x_start,
    0,
    4,
    2 * Math.sin(Math.PI / 3),
    2 * Math.sin(Math.PI / 3)
  );
  vec_apply_multiply(y_start, 1, 5, -3);

  vec_apply_multiply(
    x_start,
    0,
    3,
    2 * Math.sin(Math.PI / 3),
    Math.sin(Math.PI / 3)
  );
  vec_apply_multiply(y_start, 1, 4, -4.5);

  vec_apply_multiply(x_start, 0, 2, 2 * Math.sin(Math.PI / 3));
  vec_apply_multiply(y_start, 1, 3, -6);

  console.log(x_start);
  counter = 1;
  for (let i = 1; i < 19; i++) {
    let tile = assignment[i];
    if (resources[tile] != Resource.desert) {
      this.tiles[tile] = new Tile(
        resources[tile],
        numbers[counter],
        x_start[tile],
        y_start[tile]
      );
    } else
      this.tiles[tile] = new Tile(
        resources[tile],
        0,
        x_start[tile],
        y_start[tile]
      );
  }

  nodes = [];

  function hexagon(x_center, y_center) {
    verts = [];
    for (let i = 0; i < 6; ++i) {
      verts.push(
        Math.sin((i / 6.0) * 2 * Math.PI),
        Math.cos((i / 6.0) * 2 * Math.PI)
      );
    }
    return verts;
    //x = sin(t) + x_center; x = [x; x(1)];
    //y = cos(t) + y_center; y = [y; y(1)];
    //x = round(x, 4);
    //y = round(y, 4);
  }

  //  for (let i = 1; i < 19; i++) {}
  //console.log(JSON.stringify(this.tiles, null, 2));
  //
% There are 9 harbors total, which may be assigned randomly. First,
% initialize each of the 9 available harbors:
harbors = cell(9, 1);   % Initialize cell array
harbors{1} = Harbor(Resource.brick, 2); harbors{2} = Harbor(Resource.sheep, 2);
harbors{3} = Harbor(Resource.stone, 2); harbors{4} = Harbor(Resource.wheat, 2);
harbors{5} = Harbor(Resource.wood, 2); harbors(6:9) = {Harbor(Resource.all, 3)};
% Select order of assignment
idx = randperm(9);

% Harbors are located on:
% Nodes 4/5, Nodes 17/18, Nodes 27/41, Nodes 49/50, Nodes 51/52, Nodes
% 46/47, Nodes 36/38, Nodes 11/25, and Nodes 9/10
obj.nodes{4}.harbor = harbors{idx(1)}; obj.nodes{5}.harbor = obj.nodes{4}.harbor;
obj.nodes{17}.harbor = harbors{idx(2)}; obj.nodes{18}.harbor = obj.nodes{17}.harbor;
obj.nodes{27}.harbor = harbors{idx(3)}; obj.nodes{41}.harbor = obj.nodes{27}.harbor;
obj.nodes{49}.harbor = harbors{idx(4)}; obj.nodes{50}.harbor = obj.nodes{49}.harbor;
obj.nodes{51}.harbor = harbors{idx(5)}; obj.nodes{52}.harbor = obj.nodes{51}.harbor;
obj.nodes{46}.harbor = harbors{idx(6)}; obj.nodes{47}.harbor = obj.nodes{46}.harbor;
obj.nodes{36}.harbor = harbors{idx(7)}; obj.nodes{38}.harbor = obj.nodes{36}.harbor;
obj.nodes{11}.harbor = harbors{idx(8)}; obj.nodes{25}.harbor = obj.nodes{11}.harbor;
obj.nodes{9}.harbor = harbors{idx(9)}; obj.nodes{10}.harbor = obj.nodes{9}.harbor;
};
*/
