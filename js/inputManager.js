var tetris = tetris || {};

tetris.inputManager = function(_game){
    //Inputs for Player 02
    this.cursorsPlayer02 = _game.input.keyboard.addKeys(
            { 'up': Phaser.KeyCode.NUMPAD_6, 
             'down': Phaser.KeyCode.NUMPAD_2, 
             'left': Phaser.KeyCode.NUMPAD_1, 
             'right': Phaser.KeyCode.NUMPAD_3,
             'hold': Phaser.KeyCode.NUMPAD_4,
             'rotate': Phaser.KeyCode.NUMPAD_5});
        //Keypad UP = Rotate / CTRL 2 = Hold

    
    //Input for Player 01
    this.cursorsPlayer01 = _game.input.keyboard.addKeys( 
            { 'up': Phaser.KeyCode.E, 
             'down': Phaser.KeyCode.S, 
             'left': Phaser.KeyCode.A, 
             'right': Phaser.KeyCode.D,
             'hold': Phaser.KeyCode.Q,
             'rotate': Phaser.KeyCode.W} );
        //Q = Hold / W = Rotate
    
    this.pause = tetris.game.input.keyboard.addKey(Phaser.Keyboard.P);
};
 
tetris.inputManager.prototype = Object.create(tetris.inputManager.prototype);
tetris.inputManager.prototype.constructor = tetris.inputManager;
