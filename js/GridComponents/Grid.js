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
    
    //GRID BG
    this.pj1GridBG = tetris.game.add.image(pixStartX,pixStartY, 'grid_bg');
    
    //NEXT SPRITE
    this.nextFrameXPos = pixStartX + gameOptions.cellWidth*gameOptions.gridCellWidthCount;
    this.nextFrame = tetris.game.add.image(this.nextFrameXPos,80, 'pieceFrame');
    this.nextText = tetris.game.add.bitmapText(this.nextFrameXPos+gameOptions.pieceFramePixSize/2, pixStartY, 'titleFont',"Next", 64);
    this.nextText.anchor.setTo(.5);
    //HOLD SPRITE
    this.holdFrameXPos = pixStartX - gameOptions.pieceFramePixSize
    this.holdFrame = tetris.game.add.image(this.holdFrameXPos,80, 'pieceFrame');
    this.holdText = tetris.game.add.bitmapText(this.holdFrameXPos+gameOptions.pieceFramePixSize/2, pixStartY, 'titleFont',"Hold", 64);
    this.holdText.anchor.setTo(.5);
    
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
    this.scoreSignal = new Phaser.Signal();
    this.pieceFactory = new tetris.pieceFactory();
    
    this.SpawnNewPiece()
    
    //Fall loop pieces
    this.pieceTimer = tetris.game.time.events.loop(Phaser.Timer.SECOND, this.FallPiece, this);
    this.pieceTimer.timer.pause();
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
    
    //SCORE
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
    
    //LINE DISPLACEMENT
    if(numOfLines > 0) 
    {
        for(var i = 0; i < linesToDelete.length; i++)
        {
            this.ClearLine(linesToDelete[i]);
        }
        
        //buscar la linea limpiada que esta mas arriba
        var min = Array.min(linesToDelete);   
        if(this.ClumpFromThis(min))
        {        
            var max = Array.max(linesToDelete);
            //check for the bottom line emptyNess
            if(!this.CheckLineHasPiece(max)){  
                //if it completly empty clump now from that line
                this.ClumpFromThis(max);
            }
            
            //una vez colocado
            //volver a llamar a esta funcion
            this.ScoreLines();
            
        }
        else{ 
            
            var max = Array.max(linesToDelete);
            //check for the bottom line emptyNess
            if(!this.CheckLineHasPiece(max)){  
                //if it completly empty clump now from that line
                this.ClumpFromThis(max);
            }
            
        }
    }
    
};
tetris.Grid.prototype.ClearLine = function(posY){
    
    for (var posX = 0 ; posX < gameOptions.gridCellWidthCount; posX++)
    {
        this.gridMatrix[posY][posX].spriteID = SpriteID.NULL;
        this.gridMatrix[posY][posX].state = CellStates.EMPTY;
        this.gridMatrix[posY][posX].DestroyImg();
        
    }
};

//CLUMP MANAGMENT
tetris.Grid.prototype.ClumpFromThis = function(posY){
    //Buscar lineas con piezas por encima de las que se acaban de limpiar     

    var clumpLines = [];
    for(var i = posY-1; i >= 0; i--) //Empieza justo encima de la linea que se acaba de limpiar (min-1)
    {
        if(this.CheckLineHasPiece(i))
        {
            clumpLines.push(i);
        }
        else{
            break;
        }
    }

    //si hay lineas que bajar
    if(clumpLines.length > 0)
    {
        var clump = this.CreateClump(clumpLines);
        //bajar este clump detectanto colisiones
        this.PlaceClump(clump);

        return true;
        //repeat procees until no emptylines are found
    }
}
tetris.Grid.prototype.CreateClump = function(clumpLines){
    //creamos un clump el cual vamos a bajar
    var clump = {shape: [], topLeft:
                            {row:0,col:0},
                 startRow:0
                };

    clump.shape = new Array(clumpLines.length);
    //el clump.shape va de arriba a abajo en el grid, pero el clumpLines 0-X va de abajo arriba en el grid, es decir clumpLines[0]=19 y [1]= 18 y queremos que la primera row del clump sea la 18 y el shape tiene el mismo numero de rows que clumpLines
    clump.topLeft.row = clumpLines[clumpLines.length-1];
    clump.startRow = clumpLines[clumpLines.length-1];

    //vamos a llenar el clump.shape de abajo a arriba
    //clump.shape[end] corresponde a clumpLines[0]
    //entonces con la i recorremos de adelante hacia atras el clumpLines
    //y con line recorremos el clump.shape de atras a adelante
    for (var line = clump.shape.length-1, i = 0; line >=0; line--, i++) //empezamos por la row de abajo
    {
        clump.shape[line] = new Array(gameOptions.gridCellWidthCount);

        for (var col = 0 ; col < clump.shape[line].length; col++)
        {
            //COPY (do not reference the grid so it is going to change in the next lines)
            clump.shape[line][col] = new tetris.Cell();

            clump.shape[line][col].state = this.gridMatrix[clumpLines[i]][col].state;
            clump.shape[line][col].spriteID = this.gridMatrix[clumpLines[i]][col].spriteID;


            this.gridMatrix[clumpLines[i]][col].state = CellStates.EMPTY;
            this.gridMatrix[clumpLines[i]][col].spriteID = SpriteID.NULL;
            this.gridMatrix[clumpLines[i]][col].DestroyImg();

        }
    }
    
    return clump;
}
tetris.Grid.prototype.PlaceClump = function(clump){
    var keepGoing = true;
    while (keepGoing){

        for (var row = 0; row < clump.shape.length; row++) {
            for (var col = 0; col < clump.shape[row].length; col++) 
            {
                if (clump.shape[row][col].state == 1)
                {
                    if (row + clump.topLeft.row >= gameOptions.gridCellHeightCount) 
                    {
                        //this block would be below the playing field
                        clump.topLeft.row--;
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
}
tetris.Grid.prototype.AddClump = function (clump){
    
    for (var row = 0; row < clump.shape.length; row++) {
        for (var col = 0; col < clump.shape[row].length; col++) 
        {
            //do not reference the clump.shape[row1][col1]
            this.gridMatrix[row + clump.topLeft.row][col] = new tetris.Cell();
            
            //state
            this.gridMatrix[row + clump.topLeft.row][col].state = 
                clump.shape[row][col].state;
            //spriteId
            this.gridMatrix[row + clump.topLeft.row][col].spriteID = 
                clump.shape[row][col].spriteID;
            //image
            var pixX = gameOptions.cellWidth * col;
            var pixEndY = gameOptions.cellHeight * (row + clump.topLeft.row);
            var pixStartY = gameOptions.cellHeight * (row + clump.startRow)
            
            //instead of this call a function that interpolates the sprite
            //from a pixYStart to pixY (end pos)
            //y cuando termina que la añada al grid
                        
            this.gridMatrix[row + clump.topLeft.row][col].img =
            tetris.game.add.image(this.startCellX + pixX,this.startCellY + pixStartY, SpriteIMG[clump.shape[row][col].spriteID]);
            
            this.gridMatrix[row + clump.topLeft.row][col].Fallimg(this.startCellY+pixEndY);
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
//CURRENT PIECE LOGIC
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
            this.RemoveCurrentPiece();
            this.currentPiece.MovePiece(TypeOfMovement.ROTATE, this);
            this.AddPiece(this.currentPiece,this.currentPiece.x,this.currentPiece.y );
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
    var newPiece = this.pieceFactory.createPiece();
    this.AddPiece(newPiece,3,0);
    this.UpdateNextPiece(SpriteID.I);
    
}

tetris.Grid.prototype.UpdateNextPiece = function(pieceID){
        
    var imgXPos = this.nextFrameXPos+gameOptions.pieceFramePixSize/2;
    var imgYPos = this.startCellY+gameOptions.pieceFramePixSize/2;
    
    this.nextPieceIMG = tetris.game.add.image(imgXPos,imgYPos, SpriteFullIMG[pieceID]);
    this.nextPieceIMG.anchor.setTo(0.5);
    this.nextPieceIMG.scale.setTo(0.6);
}

tetris.Grid.prototype.UpdateHoldPiece = function(pieceID){
        
    var imgXPos = this.holdFrameXPos+gameOptions.pieceFramePixSize/2;
    var imgYPos = this.startCellY+gameOptions.pieceFramePixSize/2;
    
    this.holdedPieceID = pieceID;
    this.holdPieceIMG = tetris.game.add.image(imgXPos,imgYPos, SpriteFullIMG[pieceID]);
    this.holdPieceIMG.anchor.setTo(0.5);
    this.holdPieceIMG.scale.setTo(0.6);
}