var tetris = tetris || {};

tetris.inputManager = function(_game){
    //Inputs from Player 02
    this.cursorsPlayer02 = _game.input.keyboard.createCursorKeys();
    //Q = Hold / E = Rotate
    
    //Input from Player 01
    this.cursorsPlayer01 = _game.input.keyboard.addKeys( 
            { 'up': Phaser.KeyCode.W, 
             'down': Phaser.KeyCode.S, 
             'left': Phaser.KeyCode.A, 
             'right': Phaser.KeyCode.D } );
    //Keypad 0 = Rotate / CTRL 2 = Hold
    
};
 
tetris.inputManager.prototype = Object.create(tetris.inputManager.prototype);
tetris.inputManager.prototype.constructor = tetris.inputManager;
