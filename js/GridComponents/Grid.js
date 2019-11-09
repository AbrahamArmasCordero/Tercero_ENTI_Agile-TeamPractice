var tetris = tetris || {};

const TypeOfMovement ={
    DROP: 0,
    FASTER: 1,
    RIGHT: 2,
    LEFT: 3,
    ROTATE: 4
}

tetris.Grid = function(){

    this.gridMatrix = new Array(gameOptions.gridCellHeightCount);
    //this.currenPiece = new tetris.Piece();
    //this.nextPiece = new tetris.Piece();
    
    for(var x = 0; x < gameOptions.gridCellHeightCount; x++)
    {
        this.gridMatrix[x] = new Array(gameOptions.gridCellWidthCount);
       // var debug = "";
        for(var y = 0 ; y < gameOptions.gridCellWidthCount; y++)
        {
            this.gridMatrix[x][y] = new tetris.Cell();
            //this.gridMatrix[x][y].spriteID = 'R'+x+'C'+y;
            //debug+=this.gridMatrix[x][y].spriteID+',';
        }
        //console.log(debug)
    }
};
 
tetris.Grid.prototype = Object.create(tetris.Grid.prototype);
tetris.Grid.prototype.constructor = tetris.Grid;

tetris.Grid.prototype.ReturnCell = function(row, colum){
        return this.gridMatrix[row][colum];
};

tetris.Grid.prototype.MovePiece = function(_typeOfMovement){
    switch(_typeOfMovement){
            
        case TypeOfMovement.DROP: 
            break;            
        case TypeOfMovement.FASTER: 
            break;         
        case TypeOfMovement.LEFT: 
            break;       
        case TypeOfMovement.RIGHT: 
            break;     
        case TypeOfMovement.ROTATE:
            //this.currentPiece.Rotate()
            break;
    }
};

tetris.Grid.prototype.CheckLine = function(){
    
};

tetris.Grid.prototype.ScoreLines = function(){
    
};
tetris.Grid.prototype.ClearLine = function(){
    
};