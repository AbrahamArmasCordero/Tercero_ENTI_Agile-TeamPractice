var tetris = tetris || {};

const CellStates = {
    EMPTY: 0,
    PLACED: 1,
    MOVING: 2,
}

const SpriteID ={
    O: 0,
    L:{
      Right: 1,
      Left: 2
    },
    I: 3,
    T: 4,
    Z: {
        Right: 5,
        Left: 6
    },
    NULL: 7
}

const SpriteIMG = ['Opiece','LRpiece','LLpiece','Ipiece','Tpiece','ZRpiece','ZLpiece']

tetris.Cell = function(){
    this.state = CellStates.EMPTY;
    this.spriteID = SpriteID.NULL;
    this.img = null;
};
 
tetris.Cell.prototype = Object.create(tetris.Cell.prototype);
tetris.Cell.prototype.constructor = tetris.Cell;

tetris.Cell.prototype.DestroyImg = function(){
    if(this.img != null)
        this.img.kill();
}