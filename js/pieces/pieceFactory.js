var tetris = tetris || {};

tetris.pieceFactory = function(){
    //Historical of fieces
    //Max historical of pieces
    this.historicalPiece = [0,0];
};
 

tetris.pieceFactory.prototype = Object.create(tetris.pieceFactory.prototype);
tetris.pieceFactory.prototype.constructor = tetris.pieceFactory;

tetris.pieceFactory.prototype.createPiece = function(){
    //While not repeated 2 times on historical
    var indPiece = 0;
    do{
        indPiece = tetris.game.rnd.integerInRange(0, 6);
    }while(this.is2TimesRepeated(indPiece))
        
    this.historicalPiece.shift();
    this.historicalPiece.push(indPiece);
    
    switch(indPiece){  
        case 0:
            return new tetris.iPiece();
        case 1:
            return new tetris.lLPiece();
        case 2:
            return new tetris.lRPiece();
        case 3:
            return new tetris.oPiece();
        case 4:
            return new tetris.tPiece();
        case 5:
            return new tetris.zLPiece();
        case 6:
            return new tetris.zRPiece();
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