var tetris = tetris || {};

tetris.lRPiece = function(){
    this.pieceMatrix = [
        [
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 1]
        ],
        [
            [0, 0, 1],
            [1, 1, 1],
            [0, 0, 0]
        ],
        [
            [1, 1, 0],
            [0, 1, 0],
            [0, 1, 0]
        ],
        [
            [0, 0, 0],
            [1, 1, 1],
            [1, 0, 0]
        ]
    ];
    this.pieceSprite = 1;
};

tetris.lRPiece.prototype = Object.create(tetris.piece.prototype);
tetris.lRPiece.prototype.constructor = tetris.lRPiece;