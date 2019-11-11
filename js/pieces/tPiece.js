var tetris = tetris || {};

tetris.tPiece = function(){
    this.pieceMatrix = [
      [1, 1, 1, 0],
      [0, 1, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ];
    this.spriteID = SpriteID.T;
};
 
tetris.tPiece.prototype = Object.create(tetris.piece.prototype);
tetris.tPiece.prototype.constructor = tetris.tPiece;