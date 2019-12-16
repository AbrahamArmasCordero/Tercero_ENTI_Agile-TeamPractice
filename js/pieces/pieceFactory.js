var tetris = tetris || {};

tetris.pieceFactory = function(){
    //Historical of fieces
    //Max historical of pieces
    this.historicalPiece = [0,0];
    this.nextPiece = tetris.game.rnd.integerInRange(0, 6);
    this.createdPiece = 0;
};
 

tetris.pieceFactory.prototype = Object.create(tetris.pieceFactory.prototype);
tetris.pieceFactory.prototype.constructor = tetris.pieceFactory;

tetris.pieceFactory.prototype.createPiece = function(){
    //While not repeated 2 times on historical
    this.createdPiece = this.nextPiece;
    do{
        this.nextPiece = tetris.game.rnd.integerInRange(0, 6);
    }while(this.is2TimesRepeated(this.nextPiece))

    this.historicalPiece.shift();
    this.historicalPiece.push(this.createdPiece);
    
    switch(this.createdPiece){  
        case 0:
            return new tetris.oPiece();
        case 1:
            return new tetris.lRPiece();
        case 2:
            return new tetris.lLPiece();
        case 3:
            return new tetris.iPiece();
        case 4:
            return new tetris.tPiece();
        case 5:
            return new tetris.zRPiece();
        case 6:
            return new tetris.zLPiece();
    }
}
tetris.pieceFactory.prototype.is2TimesRepeated = function(numberPieceIndex){
    for(var i = 0; i < this.historicalPiece.length; i++){
        if(numberPieceIndex != this.historicalPiece[i]){
            return false;
        }  
    }
    return true;
}

tetris.pieceFactory.prototype.RequestPiece = function(id){
    
    switch(id){
        case SpriteID.O:
            return new tetris.oPiece();
            break;
        case SpriteID.I:
            return new tetris.iPiece();
            break;
        case SpriteID.T:
            return new tetris.tPiece();
            break;
        case SpriteID.L.Left:
            return new tetris.lLPiece();
            break;
        case SpriteID.L.Right:
            return new tetris.lRPiece();
            break;
        case SpriteID.Z.Left:
            return new tetris.zLPiece();
            break;
        case SpriteID.Z.Right:
            return new tetris.zRPiece();
            break;
            
    }
}