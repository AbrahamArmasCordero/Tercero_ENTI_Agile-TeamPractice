var tetris = tetris || {};

const PlayingStates = {
    COUNTDOWN: 0,
    PLAY: 1,
    PAUSE: 2,
    END: 3
}

tetris.inGame = {
    init:function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.playingState = PlayingStates.PLAY;
    },
    preload:function(){
        var ruta = 'assets/img/';
        //Load Play state
        this.load.image('grid_bg', ruta+'grid_sprite320x640.png');
        
        this.load.image(SpriteIMG[SpriteID.I], ruta+ 'tetriminos/IPiece32x32.png');
        this.load.image(SpriteIMG[SpriteID.L.Left], ruta + 'tetriminos/LLeftPiece32x32.png');
        this.load.image(SpriteIMG[SpriteID.L.Right], ruta + 'tetriminos/LRightPiece32x32.png');
        this.load.image(SpriteIMG[SpriteID.O], ruta+ 'tetriminos/OPiece32x32.png');
        this.load.image(SpriteIMG[SpriteID.T], ruta + 'tetriminos/TPiece32x32.png');
        this.load.image(SpriteIMG[SpriteID.Z.Left], ruta + 'tetriminos/ZLeftPiece32x32.png');
        this.load.image(SpriteIMG[SpriteID.Z.Right], ruta + 'tetriminos/ZRightPiece32x32.png');
        //Load Pause state
        
        //Load End state

    },
    create:function(){
        
        estate = 1;
        //Bg grids
        this.pj1GridBG = this.game.add.image(182,80, 'grid_bg');
        this.pj2GridBG = this.game.add.image(864,80, 'grid_bg');
        
        //Inputs
        this.inputHandler = new tetris.inputManager(tetris.game);
        
        //Players
        this.player1 = new tetris.Player(this.inputHandler.cursorsPlayer01,                                                                                     gameOptions.grid01PositionX, gameOptions.grid01PositionY);
        
        this.player2 = new tetris.Player(this.inputHandler.cursorsPlayer02, gameOptions.grid02PositionX,                                                         gameOptions.grid02PositionY);
        //End 
        

    },
    update:function(){
        switch(this.playingState){
            case PlayingStates.COUNTDOWN:               
                break;
            case PlayingStates.PLAY:
                this.player1.PjUpdate();
                this.player2.PjUpdate();
                break;
            case PlayingStates.PAUSE:
                break;
            case PlayingStates.END:
                break;
        }
    },
    play:function(){
        //Play
    },
    pause:function(){
        //Pause
    },
    reset:function(){
        //Reiniciar  
    },
};