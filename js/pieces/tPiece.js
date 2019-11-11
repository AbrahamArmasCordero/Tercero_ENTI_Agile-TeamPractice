var tetris = tetris || {};

tetris.tPiece = function(){
    this.pieceMatrix = [
      [
          [0, 1, 0],
          [1, 1, 1],
          [0, 0, 0]
      ],[
          [0, 1, 0],
          [0, 1, 1],
          [0, 1, 0]
      ],[
          [0, 0, 0],
          [1, 1, 1],
          [0, 1, 0]
      ],[
          [0, 1, 0],
          [1, 1, 0],
          [0, 1, 0]
      ]
    ];
    this.pieceSprite = 4;
};

tetris.tPiece.prototype = Object.create(tetris.piece.prototype);
tetris.tPiece.prototype.constructor = tetris.tPiece;