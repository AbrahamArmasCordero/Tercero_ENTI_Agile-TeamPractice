var tetris = tetris || {};

tetris.oPiece = function(){
    this.pieceMatrix = [
        [
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0],
        ]
    ];
    this.pieceSprite = 0;
};

tetris.oPiece.prototype = Object.create(tetris.piece.prototype);
tetris.oPiece.prototype.constructor = tetris.oPiece;