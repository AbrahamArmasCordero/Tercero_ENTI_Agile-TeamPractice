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
        
        this.testGrid = new tetris.Grid(gameOptions.grid01PositionX,gameOptions.grid01PositionY);
        this.testGrid.AddPiece(new tetris.lLPiece(), 3, 0);
        this.testGrid.MovePiece(TypeOfMovement.LEFT);
    },
    update:function(){
        //LEFT
        if(this.inputHandler.cursorsPlayer01.left.isDown && this.inputHandler.cursorsPlayer01.left.downDuration(1))
        {
            this.testGrid.MovePiece(TypeOfMovement.LEFT);
        }
        //RIGHT
        else if(this.inputHandler.cursorsPlayer01.right.isDown && this.inputHandler.cursorsPlayer01.right.downDuration(1))
        {
            this.testGrid.MovePiece(TypeOfMovement.RIGHT);
        }
        //DOWN Independent
        if(this.inputHandler.cursorsPlayer01.down.isDown && this.inputHandler.cursorsPlayer01.down.downDuration(1))
        {
            this.testGrid.MovePiece(TypeOfMovement.FASTER);
        }
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