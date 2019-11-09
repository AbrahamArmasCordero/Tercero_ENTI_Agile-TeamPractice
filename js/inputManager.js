var tetris = tetris || {};

tetris.inputManager = function(_game){
    //Inputs from Player 02
    this.cursorsPlayer02 = _game.input.keyboard.addKeys(
            { 'up': Phaser.KeyCode.UP, 
             'down': Phaser.KeyCode.DOWN, 
             'left': Phaser.KeyCode.LEFT, 
             'right': Phaser.KeyCode.RIGHT,
             'hold': Phaser.KeyCode.CONTROL,
             'rotate': Phaser.KeyCode.NUMPAD_0});
        //Keypad 0 = Rotate / CTRL 2 = Hold

    
    //Input from Player 01
    this.cursorsPlayer01 = _game.input.keyboard.addKeys( 
            { 'up': Phaser.KeyCode.W, 
             'down': Phaser.KeyCode.S, 
             'left': Phaser.KeyCode.A, 
             'right': Phaser.KeyCode.D,
             'hold': Phaser.KeyCode.Q,
             'rotate': Phaser.KeyCode.E} );
        //Q = Hold / E = Rotate

    
};
 
tetris.inputManager.prototype = Object.create(tetris.inputManager.prototype);
tetris.inputManager.prototype.constructor = tetris.inputManager;
