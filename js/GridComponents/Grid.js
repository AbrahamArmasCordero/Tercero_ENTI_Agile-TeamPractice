var tetris = tetris || {};

const TypeOfMovement ={
    DROP: 0,
    FASTER: 1,
    RIGHT: 2,
    LEFT: 3,
    ROTATE: 4
}

tetris.Grid = function(pixStartX, pixStartY, scoreFunc){
    
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
    
    this.scoreSignal = new Phaser.Signal();
    this.SpawnNewPiece();
};
 
tetris.Grid.prototype = Object.create(tetris.Grid.prototype);
tetris.Grid.prototype.constructor = tetris.Grid;

//LINE LOGIC
tetris.Grid.prototype.ScoreLines = function(){
    
    var linesToDelete = [];
    var numOfLines = 0;
    for(var x = 0; x < this.currentPiece.pieceMatrix[this.currentPiece.rotatedState].length; x++)
    {
        for(var y = 0 ; y < this.currentPiece.pieceMatrix[this.currentPiece.rotatedState].length; y++)
        {
            if(this.currentPiece.pieceMatrix[this.currentPiece.rotatedState][x][y] == 1)
            {
                var posY = this.currentPiece.y+x;
                var alreadyADeleted = linesToDelete.find(function(posTocheck){
                    return posTocheck == posY;
                });
                if(this.CheckLine(posY) && (alreadyADeleted == null))
                {
                    //count one line numOfLines++
                    numOfLines++;
                    //save line pos
                    linesToDelete.push(posY);
                }
            }
        }
    }
    
    if(numOfLines >= 4)
    {
        //tetris
        //numoflines * scoreOfOneLine * tetris Multiplier
        this.scoreSignal.dispatch(numOfLines*10*10);
        
    }
    else if(numOfLines > 0 ){
        //score += numOfLines*scoreOfOneLine
        this.scoreSignal.dispatch(numOfLines*10);
    }
    
    for(var i = 0; i < linesToDelete.length; i++){
        this.ClearLine(linesToDelete[i]);
    }
};

tetris.Grid.prototype.CheckLine = function(posY){

    for (var posX = 0 ; posX < gameOptions.gridCellWidthCount; posX++)
    {
        if(this.gridMatrix[posY][posX].state == CellStates.EMPTY)
        {
            return false;
        }
    }
    return true;
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