var tetris = tetris || {};

var Name;
var holdedPiece;

tetris.Player = function(controller, pixStartX, pixStartY){
    this.score = 0;
    this.cursors = controller;
    this.myGrid = new tetris.Grid(pixStartX,pixStartY);
    
    var scorePos = pixStartX+gameOptions.gridCellWidthCount*gameOptions.cellWidth*0.5;
    
    this.scoreText = tetris.game.add.bitmapText(scorePos, 50, 'titleFont',"Score: "+this.score.toString(), 64);
    this.scoreText.anchor.setTo(.5);
    
    this.myGrid.scoreSignal.add(this.AddScore, this);
    
};

tetris.Player.prototype = Object.create(tetris.Player.prototype);
tetris.Player.prototype.constructor = tetris.Player;

tetris.Player.prototype.Update = function(){
    
};

tetris.Player.prototype.CheckLose = function(){
    return this.myGrid.CheckLineHasPiece(1); 
};

tetris.Player.prototype.PjUpdate = function(){
    
        //LEFT
        if(this.cursors.left.isDown && this.cursors.left.downDuration(1))
        {
            this.myGrid.MovePiece(TypeOfMovement.LEFT);
        }
        //RIGHT
        else if(this.cursors.right.isDown && this.cursors.right.downDuration(1))
        {
            this.myGrid.MovePiece(TypeOfMovement.RIGHT);
        }
        //DOWN Independent
        if(this.cursors.down.isDown && this.cursors.down.downDuration(1))
        {
            this.myGrid.MovePiece(TypeOfMovement.FASTER);
        }
        if(this.cursors.up.isDown && this.cursors.up.downDuration(1))
        {
            this.myGrid.MovePiece(TypeOfMovement.DROP);
        }
        if(this.cursors.hold.isDown && this.cursors.hold.downDuration(1))
        {
            //this.myGrid.MovePiece(TypeOfMovement.FASTER);
        }
        if(this.cursors.rotate.isDown && this.cursors.rotate.downDuration(1))
        {
            this.myGrid.MovePiece(TypeOfMovement.ROTATE);
        }
}

tetris.Player.prototype.AddScore = function(toAdd){
    this.score += toAdd;
    this.scoreText.text = "Score: "+this.score.toString();
    console.log(this.score);
}