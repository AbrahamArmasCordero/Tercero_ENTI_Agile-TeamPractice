var tetris = tetris || {};

tetris.zRPiece = function(){
    this.pieceMatrix = [
      [0, 1, 1, 0],
      [1, 1, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ];
    this.spriteID = SpriteID.Z.Right;
};
 
tetris.zRPiece.prototype = Object.create(tetris.piece.prototype);
tetris.zRPiece.prototype.constructor = tetris.zRPiece;