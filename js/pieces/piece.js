var tetris = tetris || {};

tetris.piece = function(){
    this.pieceMatrix = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ];
};
 

tetris.piece.prototype = Object.create(tetris.piece.prototype);
tetris.piece.prototype.constructor = tetris.piece;

tetris.piece.prototype.x = 3;
tetris.piece.prototype.y = 2;
tetris.piece.prototype.rotatedState = 0;
tetris.piece.prototype.pieceSprite = 0;

tetris.piece.prototype.MovePiece = function(movementType){
    
}

tetris.piece.prototype.Rotate = function(){
    
}

tetris.piece.prototype.CheckCollision = function(grid){
    
}