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
    
    //Create the matrix grid
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
    
    //Fall loop pieces
    this.pieceTimer = tetris.game.time.events.loop(Phaser.Timer.SECOND, this.FallPiece, this);
    this.pieceTimer.timer.pause();
    
    this.scoreSignal = new Phaser.Signal();
    this.pieceFactory = new tetris.pieceFactory();
    this.SpawnNewPiece();
};
 
tetris.Grid.prototype = Object.create(tetris.Grid.prototype);
tetris.Grid.prototype.constructor = tetris.Grid;

//LINE LOGIC
tetris.Grid.prototype.ScoreLines = function(){
    
    var linesToDelete = [];
    var numOfLines = 0;
    for(var y = gameOptions.gridCellHeightCount-1; y >= 0; y--)
    {
        //primero miro si es posible que esta fila pueda ser completada
        if(this.gridMatrix[y][gameOptions.gridCellWidthCount-1].state == CellStates.PLACED)
        {
            var posY = y;
            var alreadyADeleted = linesToDelete.find(function(posTocheck){
                return posTocheck == posY;
            });
            //miro si ya no la habiamos mirado antes y si esta llena
            if(this.CheckFullLine(posY) && (alreadyADeleted == null))
            {
                //Lineas completadas ++
                numOfLines++;
                //Reminder de que linea acabamos de completar
                linesToDelete.push(posY);
            }
        }
    }
    
    if(numOfLines >= 4)//tetris
    {
        //numoflines * scoreOfOneLine * tetris Multiplier
        this.scoreSignal.dispatch(numOfLines
                                  *gameOptions.pointsForLine
                                  *gameOptions.tetrisMultiplier);
        
    }
    else if(numOfLines > 0 ){
        //score += numOfLines*scoreOfOneLine
        this.scoreSignal.dispatch(numOfLines
                                  *gameOptions.pointsForLine);
    }
    
    if(numOfLines > 0) 
    {
        for(var i = 0; i < linesToDelete.length; i++)
        {
            this.ClearLine(linesToDelete[i]);
        }
        
        //down the lanes
        //buscar la linea limpiada que esta mas arriba
        var min = Array.min(linesToDelete);
        var clumpLines = [];
        //a partir de ahi dividir todo el grid en un Clump grande
        for(var i = min-1; i >= 0; i--)
        {
            if(this.CheckLineHasPiece(i))
            {
                clumpLines.push(i);
            }
            else{
                break;
            }
        }
        //clump.topLeft = {row: 10, col: 0};
        var clump = {shape: [], 
                     topLeft:
                     {
                         row:0,
                         col:0
                     }
                    };
        clump.shape = new Array(clumpLines.length);
        clump.topLeft.row = clumpLines[clumpLines.length-1];
        
        
        var i = 0;
        for (var line = clump.shape.length-1; line >=0; line--)
        {
            clump.shape[line] = new Array(gameOptions.gridCellWidthCount);
            
            for (var col = 0 ; col < clump.shape[line].length; col++)
            {
                //COPY
                clump.shape[line][col] = new tetris.Cell();
                
                clump.shape[line][col].state = this.gridMatrix[clumpLines[i]][col].state;
                clump.shape[line][col].spriteID = this.gridMatrix[clumpLines[i]][col].spriteID;

                this.gridMatrix[clumpLines[i]][col].state = CellStates.EMPTY;
                this.gridMatrix[clumpLines[i]][col].spriteID = SpriteID.NULL;
                this.gridMatrix[clumpLines[i]][col].DestroyImg();
                
            }
            i++;
        }
        
        var keepGoing = true;
        while (keepGoing){
            
            for (var row = 0; row < clump.shape.length; row++) {
                for (var col = 0; col < clump.shape[row].length; col++) 
                {
                    if (clump.shape[row][col].state == 1)
                    {
                        if (row + clump.topLeft.row >= gameOptions.gridCellHeightCount-1) 
                        {
                            //this block would be below the playing field
                            keepGoing = false;
                            this.AddClump(clump);
                            break;
                        }   
                        else if (this.gridMatrix[row + clump.topLeft.row][col+clump.topLeft.col].state == CellStates.PLACED) 
                        {
                            //collided with a tetromino
                            clump.topLeft.row--;
                            keepGoing = false;
                            this.AddClump(clump);
                            break;
                        }

                    }
                }
            }
            clump.topLeft.row++;
        }
        //bajar este clump detectanto colisiones
        
        //una vez colocado
        //volver a llamar a esta funcion
    }
    
};

Array.min = function( array ){
    return Math.min.apply( Math, array );
};

tetris.Grid.prototype.AddClump = function (clump){
    for (var row1 = 0; row1 < clump.shape.length; row1++) {
        for (var col1 = 0; col1 < clump.shape[row1].length; col1++) 
        {
            //console.log(clump.shape[row1][col1]);

            this.gridMatrix[row1 + clump.topLeft.row][col1] = new tetris.Cell();
            
            this.gridMatrix[row1 + clump.topLeft.row][col1].state = clump.shape[row1][col1].state;
            this.gridMatrix[row1 + clump.topLeft.row][col1].spriteID = clump.shape[row1][col1].spriteID;

            var pixX = gameOptions.cellWidth * col1;
            var pixY = gameOptions.cellHeight * (row1 + clump.topLeft.row);

            this.gridMatrix[row1 + clump.topLeft.row][col1].img =
            tetris.game.add.image(this.startCellX + pixX,this.startCellY + pixY, SpriteIMG[clump.shape[row1][col1].spriteID]);
        }
    }
    
};

tetris.Grid.prototype.CheckFullLine = function(posY){

    for (var posX = 0 ; posX < gameOptions.gridCellWidthCount; posX++)
    {
        if(this.gridMatrix[posY][posX].state == CellStates.EMPTY)
        {
            return false;
        }
    }
    return true;
};
tetris.Grid.prototype.CheckLineHasPiece = function(posY){

    for (var posX = 0 ; posX < gameOptions.gridCellWidthCount; posX++)
    {
        if(this.gridMatrix[posY][posX].state == CellStates.PLACED)
        {
            return true;
        }
    }
    return false;
};

tetris.Grid.prototype.ClearLine = function(posY){
    
    for (var posX = 0 ; posX < gameOptions.gridCellWidthCount; posX++)
    {
        this.gridMatrix[posY][posX].spriteID = SpriteID.NULL;
        this.gridMatrix[posY][posX].state = CellStates.EMPTY;
        this.gridMatrix[posY][posX].img.kill();
        
    }
};

//PIECE LOGIC
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
                var posX = this.currentPiece.x + y;
                var posY = this.currentPiece.y + x;
                
                var pixX = gameOptions.cellWidth * posX;
                var pixY = gameOptions.cellHeight * posY;
                
                 this.gridMatrix[posY][posX].spriteID = this.currentPiece.pieceSprite;
                 this.gridMatrix[posY][posX].state = CellStates.MOVING;
                 this.gridMatrix[posY][posX].img = 
                     tetris.game.add.image(this.startCellX + pixX,this.startCellY + pixY, SpriteIMG[this.currentPiece.pieceSprite]);
            }
        }
    }
};

tetris.Grid.prototype.PlacePiece = function(piece){
    var placedPiece = piece;
    for(var x = 0; x < placedPiece.pieceMatrix[placedPiece.rotatedState].length; x++)
    {
        for(var y = 0 ; y < placedPiece.pieceMatrix[placedPiece.rotatedState].length; y++)
        {
            if(placedPiece.pieceMatrix[placedPiece.rotatedState][x][y] == 1)
            {
                var posX = placedPiece.x + y;
                var posY = placedPiece.y + x;
                
                var pixX = gameOptions.cellWidth * posX;
                var pixY = gameOptions.cellHeight * posY;
                
                 this.gridMatrix[posY][posX].spriteID = placedPiece.pieceSprite;
                 this.gridMatrix[posY][posX].state = CellStates.PLACED;
                 this.gridMatrix[posY][posX].img = 
                     tetris.game.add.image(this.startCellX + pixX, this.startCellY + pixY, SpriteIMG[placedPiece.pieceSprite]);
            }
        }
    }
    
}

//Clean the current piece of the grid
tetris.Grid.prototype.RemoveCurrentPiece = function(){
    
    for(var x = 0; x < this.currentPiece.pieceMatrix[this.currentPiece.rotatedState].length; x++)
    {
        for(var y = 0 ; y < this.currentPiece.pieceMatrix[this.currentPiece.rotatedState].length; y++)
        {
            if(this.currentPiece.pieceMatrix[this.currentPiece.rotatedState][x][y] == 1)
            {
                var posX = this.currentPiece.x+y;
                var posY = this.currentPiece.y+x;
                
                 this.gridMatrix[posY][posX].spriteID = SpriteID.NULL;
                 this.gridMatrix[posY][posX].state = CellStates.EMPTY;
                 this.gridMatrix[posY][posX].DestroyImg();
            }
        }
    }
};


//STATE CHANGERS
tetris.Grid.prototype.MovePiece = function(_typeOfMovement){
    switch(_typeOfMovement){                 
        case TypeOfMovement.FASTER: 
            this.RemoveCurrentPiece();
            this.currentPiece.MovePiece(TypeOfMovement.FASTER, this)
            this.AddPiece(this.currentPiece,this.currentPiece.x,this.currentPiece.y );
            break;         
        case TypeOfMovement.LEFT:
            this.RemoveCurrentPiece();
            this.currentPiece.MovePiece(TypeOfMovement.LEFT, this)
            this.AddPiece(this.currentPiece,this.currentPiece.x,this.currentPiece.y );
            break;       
        case TypeOfMovement.RIGHT: 
            this.RemoveCurrentPiece();
            this.currentPiece.MovePiece(TypeOfMovement.RIGHT, this)
            this.AddPiece(this.currentPiece,this.currentPiece.x,this.currentPiece.y );
            break;     
        case TypeOfMovement.DROP:
            this.RemoveCurrentPiece();
            this.currentPiece.MovePiece(TypeOfMovement.DROP, this);
            this.AddPiece(this.currentPiece,this.currentPiece.x,this.currentPiece.y );
            break;
        case TypeOfMovement.ROTATE:
            //Rotate the piece
            break;
    }
};

tetris.Grid.prototype.SetFallingTime = function(timeMs){
    this.pieceTimer.delay = timeMs;
}

tetris.Grid.prototype.FallPiece = function(){
    if(this.currentPiece != null){
        if(!this.currentPiece.IsCollisionSide(this, CollisionSide.BOTTOM)){
            this.RemoveCurrentPiece();
            this.currentPiece.MovePiece(TypeOfMovement.FASTER,this)
            this.AddPiece(this.currentPiece,this.currentPiece.x,this.currentPiece.y );
        }else{
            this.RemoveCurrentPiece();
            this.PlacePiece(this.currentPiece);
            
            //aqui miro lineas y tetris
            this.ScoreLines();
            this.SpawnNewPiece();
        }
    }
}

tetris.Grid.prototype.SpawnNewPiece = function(){
    this.AddPiece(new tetris.oPiece(),3,0);
}