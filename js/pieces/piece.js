var tetris = tetris || {};

var CollisionSide ={
    BOTTOM: 0,
    LEFT: 1,
    RIGHT: 2
}

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
        case TypeOfMovement.FASTER: 
            //Collisions al bottom
            if(this.IsCollisionSide(grid, CollisionSide.BOTTOM) == false){
                this.y += 1;
            }
            break;
        case TypeOfMovement.LEFT:
            if(this.IsCollisionSide(grid, CollisionSide.LEFT) == false){
                this.x -= 1;
            }
            break;
        case TypeOfMovement.RIGHT:
            if(this.IsCollisionSide(grid, CollisionSide.RIGHT) == false){
                this.x += 1;
            }
            break;
        case TypeOfMovement.DROP:
            while(this.IsCollisionSide(grid, CollisionSide.BOTTOM) == false){
                this.y += 1;
            }
            break;
        case TypeOfMovement.ROTATE:
            while(true){
             if(this.Rotate(grid) == false)
                 {
                     break;
                 }
            }
            break;
    }
}

tetris.piece.prototype.Rotate = function(grid){
    this.rotatedState = (this.rotatedState + 1) % this.pieceMatrix[this.rotatedState].length;
    this.pieceMatrix[this.rotatedState];
        for(var y = 0; y < this.pieceMatrix[this.rotatedState].length; y++){
            for(var x = 0; x < this.pieceMatrix[this.rotatedState].length; x++){
                if(this.pieceMatrix[this.rotatedState][y][x] == 1){
                    if(this.OcuppiedBlock(grid, x, y)){
                        this.rotatedState = (this.rotatedState -  1) % this.pieceMatrix[this.rotatedState].length;
                        this.pieceMatrix[this.rotatedState];
                        return true;
                    }
                }
            }
        }
    return false;
}

tetris.piece.prototype.IsCollisionSide = function(grid, collisionSide){
    for(var y = 0; y < this.pieceMatrix[this.rotatedState].length; y++){
        for(var x = 0; x < this.pieceMatrix[this.rotatedState].length; x++){
            //Por cada pieza en la matriz
            if(this.pieceMatrix[this.rotatedState][y][x] == 1){
                
                switch(collisionSide){
                    case CollisionSide.BOTTOM:
                        if((this.y + y) >= gameOptions.gridCellHeightCount - 1 || this.OcuppiedBlock(grid,x,y+1)){
                            return true;
                        }
                        break;
                    case CollisionSide.LEFT:
                        if((this.x + x) <= 0 || this.OcuppiedBlock(grid,x-1,y)){
                            return true;
                        }
                        break;
                    case CollisionSide.RIGHT:
                        if((this.x + x) >= gameOptions.gridCellWidthCount - 1 || this.OcuppiedBlock(grid,x+1,y)){
                            return true;
                        }
                        break;
                }
            }
        }
    }
    return false;
}

tetris.piece.prototype.OcuppiedBlock = function(grid, x, y){
    if(grid.gridMatrix[(this.y + y)][(this.x + x)].state == CellStates.PLACED){
        return true;
    }   
    return false;
}
