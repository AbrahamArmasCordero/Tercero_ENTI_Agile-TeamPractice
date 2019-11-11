var tetris = tetris || {};

tetris.zLPiece = function(){
    this.pieceMatrix = [
      [1, 1, 0, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ];
    this.spriteID = SpriteID.Z.Left;
};
 
tetris.zLPiece.prototype = Object.create(tetris.piece.prototype);
tetris.zLPiece.prototype.constructor = tetris.zLPiece;