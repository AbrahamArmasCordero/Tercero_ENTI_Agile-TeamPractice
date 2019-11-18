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

tetris.piece.prototype.MovePiece = function(movementType, grid){
    //Will move piece
    switch(movementType){       
        case TypeOfMovement.DROP: 
            break;            
        case TypeOfMovement.FASTER: 
            //Collisions al bottom
            if(this.IsCollisionBottom(grid) == false){
                this.y += 1;
            }
            break;
        case TypeOfMovement.LEFT:
            if(this.IsCollisionLeft(grid) == false){
                this.x -= 1;
            }
            break;
        case TypeOfMovement.RIGHT:
            if(this.IsCollisionRight(grid) == false){
                this.x += 1;
            }
            break;
    }
}

tetris.piece.prototype.Rotate = function(){
    //Will rotate the piece
}

tetris.piece.prototype.IsCollisionBottom = function(grid){
    for(var y = 0; y < this.pieceMatrix[this.rotatedState].length; y++){
        for(var x = 0; x < this.pieceMatrix[this.rotatedState].length; x++){
            //Por cada pieza en la matriz
            if(this.pieceMatrix[this.rotatedState][y][x] == 1){
                if((this.y + y) >= gameOptions.gridCellHeightCount - 1
                  || this.OcuppiedBottomBlock(grid,x,y)){
                    return true;
                }
            }
        }
    }
    return false;
}

tetris.piece.prototype.IsCollisionLeft = function(grid){
    for(var y = 0; y < this.pieceMatrix[this.rotatedState].length; y++){
        for(var x = 0; x < this.pieceMatrix[this.rotatedState].length; x++){
            //Por cada pieza en la matriz
            if(this.pieceMatrix[this.rotatedState][y][x] == 1){
                if((this.x + x) <= 0){
                    return true;
                }
            }
        }
    }
    return false;
}

tetris.piece.prototype.IsCollisionRight = function(grid){
    for(var y = 0; y < this.pieceMatrix[this.rotatedState].length; y++){
        for(var x = 0; x < this.pieceMatrix[this.rotatedState].length; x++){
            //Por cada pieza en la matriz
            if(this.pieceMatrix[this.rotatedState][y][x] == 1){
                if((this.x + x) >= gameOptions.gridCellWidthCount - 1){
                    return true;
                }
            }
        }
    }
    return false;
}

tetris.piece.prototype.OcuppiedBottomBlock = function(grid, x, y){
    if(grid.gridMatrix[(this.y + y + 1)][(this.x + x)].state == CellStates.PLACED){
        console.log("Siguiente celda ocupada");
        return true;
    }   
    return false;
}
