var tetris = tetris || {};

tetris.piece = function(){
    //Array of matrix that will define the position of the piece
    this.pieceMatrix = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ];
};
 

tetris.piece.prototype = Object.create(tetris.piece.prototype);
tetris.piece.prototype.constructor = tetris.piece;

//Piece propierties
tetris.piece.prototype.x = 3;
tetris.piece.prototype.y = 2;
tetris.piece.prototype.rotatedState = 0;
tetris.piece.prototype.pieceSprite = 0;

tetris.piece.prototype.MovePiece = function(movementType){
    //Will move piece
}

tetris.piece.prototype.Rotate = function(){
    //Will rotate the piece
}

tetris.piece.prototype.CheckCollision = function(grid){
    
}