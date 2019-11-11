var tetris = tetris || {};

tetris.piece = function(){
    this.pieceMatrix = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ];
    this.spriteID = 0;
    this.x = 3;
    this.y = 2;
};
 
tetris.piece.prototype = Object.create(tetris.piece.prototype);
tetris.piece.prototype.constructor = tetris.piece;

tetris.piece.prototype.MovePiece = function(movementType){
    console.log("move the piece");
}

tetris.piece.prototype.Rotate = function(){
    console.log("rotate the piece");
}

tetris.piece.prototype.CheckCollision = function(grid){
    console.log("check the piece");
}