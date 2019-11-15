var tetris = tetris || {};

const TypeOfMovement ={
    DROP: 0,
    FASTER: 1,
    RIGHT: 2,
    LEFT: 3,
    ROTATE: 4
}

tetris.Grid = function(pixStartX, pixStartY){
    
    this.startCellX = pixStartX;
    this.startCellY = pixStartY;
    
    this.gridMatrix = new Array(gameOptions.gridCellHeightCount);

    for(var x = 0; x < gameOptions.gridCellHeightCount; x++)
    {
        this.gridMatrix[x] = new Array(gameOptions.gridCellWidthCount);
       // var debug = "";
        for(var y = 0 ; y < gameOptions.gridCellWidthCount; y++)
        {
            this.gridMatrix[x][y] = new tetris.Cell();
        }
    }
    

};
 
tetris.Grid.prototype = Object.create(tetris.Grid.prototype);
tetris.Grid.prototype.constructor = tetris.Grid;

tetris.Grid.prototype.ReturnCell = function(row, colum){
        return this.gridMatrix[row][colum];
};

tetris.Grid.prototype.CheckLine = function(){
    
};

tetris.Grid.prototype.ScoreLines = function(){
    
};

tetris.Grid.prototype.ClearLine = function(){
    
};

tetris.Grid.prototype.AddPiece = function(piece, cellX,cellY){
    this.currentPiece = piece;
    this.currentPiece.x = cellX;
    this.currentPiece.y = cellY;
    
    for(var x = 0; x < this.currentPiece.pieceMatrix[this.currentPiece.rotatedState].length; x++)
    {
        for(var y = 0 ; y < this.currentPiece.pieceMatrix[this.currentPiece.rotatedState].length; y++)
        {
            if(this.currentPiece.pieceMatrix[this.currentPiece.rotatedState][x][y] == 1)
            {
                var posX = this.currentPiece.x+y;
                var posY = this.currentPiece.y+x;
                var pixX = gameOptions.cellWidth*posX;
                var pixY = gameOptions.cellHeight*posY;
                
                 this.gridMatrix[posY][posX].spriteID = this.currentPiece.pieceSprite;
                 this.gridMatrix[posY][posX].state = CellStates.MOVING;
                 this.gridMatrix[posY][posX].img = 
                     tetris.game.add.image(this.startCellX+pixX,this.startCellY+pixY, SpriteIMG[this.currentPiece.pieceSprite]);
            }
        }
    }
};

tetris.Grid.prototype.RemoveCurrentPiece = function(){
    
    for(var x = 0; x < this.currentPiece.pieceMatrix[this.currentPiece.rotatedState].length; x++)
    {
        for(var y = 0 ; y < this.currentPiece.pieceMatrix[this.currentPiece.rotatedState].length; y++)
        {
            if(this.currentPiece.pieceMatrix[this.currentPiece.rotatedState][x][y] == 1)
            {
                var posX = this.currentPiece.x+y;
                var posY = this.currentPiece.y+x;
                var pixX = gameOptions.cellWidth*posX;
                var pixY = gameOptions.cellHeight*posY;
                 this.gridMatrix[posY][posX].spriteID = SpriteID.NULL;
                 this.gridMatrix[posY][posX].state = CellStates.EMPTY;
                 this.gridMatrix[posY][posX].DestroyImg();
            }
        }
    }
};

tetris.Grid.prototype.MovePiece = function(_typeOfMovement){
    switch(_typeOfMovement){
            
        case TypeOfMovement.DROP: 
            break;            
        case TypeOfMovement.FASTER: 
            this.RemoveCurrentPiece();
            this.currentPiece.y+=1;
            this.AddPiece(this.currentPiece,this.currentPiece.x,this.currentPiece.y )
            break;         
        case TypeOfMovement.LEFT:
            this.RemoveCurrentPiece();
            this.currentPiece.x-=1;
            this.AddPiece(this.currentPiece,this.currentPiece.x,this.currentPiece.y )
            break;       
        case TypeOfMovement.RIGHT: 
            this.RemoveCurrentPiece();
            this.currentPiece.x+=1;
            this.AddPiece(this.currentPiece,this.currentPiece.x,this.currentPiece.y )
            break;     
        case TypeOfMovement.ROTATE:
            //this.currentPiece.Rotate()
            break;
    }
};
