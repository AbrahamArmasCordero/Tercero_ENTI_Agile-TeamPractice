var tetris = tetris || {};

tetris.inGame = {
    init:function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
    },
    preload:function(){
        //game.stage.backgroundColor = "#FF0000";
        var ruta = 'assets/img/';
        this.load.image('grid_bg', ruta+'grid_sprite320x640.png');
        
        this.load.image(SpriteIMG[SpriteID.I], ruta+ 'tetriminos/IPiece32x32.png');
        
        this.load.image(SpriteIMG[SpriteID.L.Left], ruta + 'tetriminos/LLeftPiece32x32.png');
        this.load.image(SpriteIMG[SpriteID.L.Right], ruta + 'tetriminos/LRightPiece32x32.png');
        this.load.image(SpriteIMG[SpriteID.O], ruta+ 'tetriminos/OPiece32x32.png');
        this.load.image(SpriteIMG[SpriteID.T], ruta + 'tetriminos/TPiece32x32.png');
        this.load.image(SpriteIMG[SpriteID.Z.Left], ruta + 'tetriminos/ZLeftPiece32x32.png');
        this.load.image(SpriteIMG[SpriteID.Z.Right], ruta + 'tetriminos/ZRightPiece32x32.png');
    },
    create:function(){
        
        estate = 1;
        this.pj1GridBG = this.game.add.image(182,80, 'grid_bg');
        this.pj2GridBG = this.game.add.image(864,80, 'grid_bg');
        
        this.inputHandler = new tetris.inputManager(tetris.game);
        
        this.player1 = new tetris.Player(this.inputHandler.cursorsPlayer01, gameOptions.grid01PositionX,gameOptions.grid01PositionY);
        
        this.player2 = new tetris.Player(this.inputHandler.cursorsPlayer02, gameOptions.grid02PositionX, gameOptions.grid02PositionY);

    },
    update:function(){
        this.player1.TestFunc();
        this.player2.TestFunc();
        
    },
    
    play:function(){
        //Play
    },
    pause:function(){
        //Pause
    },
    end:function(){
        this.game.state.start('endGame');
        //Finalizar
    },
    reset:function(){
        //Reiniciar  
    },
};