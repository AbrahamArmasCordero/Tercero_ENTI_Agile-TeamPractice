var tetris = tetris || {};

tetris.zLPiece = function(){
    this.pieceMatrix = [
      [
          [1, 1, 0],
          [0, 1, 1],
          [0, 0, 0]
      ],[
          [0, 0, 1],
          [0, 1, 1],
          [0, 1, 0]
      ],[
          [0, 0, 0],
          [1, 1, 0],
          [0, 1, 1]
      ],[
          [0, 1, 0],
          [1, 1, 0],
          [1, 0, 0]
      ]
    ];
    this.pieceSprite = 6;
};

tetris.zLPiece.prototype = Object.create(tetris.piece.prototype);
tetris.zLPiece.prototype.constructor = tetris.zLPiece;