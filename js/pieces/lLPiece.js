var tetris = tetris || {};

tetris.lLPiece = function(){
    this.pieceMatrix = [
        [
            [1, 0, 0],
            [1, 1, 1],
            [0, 0, 0]
        ],
        [
            [0, 1, 1],
            [0, 1, 0],
            [0, 1, 0]
        ],
        [
            [0, 0, 0],
            [1, 1, 1],
            [0, 0, 1]
        ],
        [
            [0, 1, 0],
            [0, 1, 0],
            [1, 1, 0]
        ]
    ];
    this.pieceSprite = 2;
};

tetris.lLPiece.prototype = Object.create(tetris.piece.prototype);
tetris.lLPiece.prototype.constructor = tetris.lLPiece;