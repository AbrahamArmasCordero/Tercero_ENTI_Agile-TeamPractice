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
        this.testGrid.AddPiece(new tetris.lLPiece(), 1, 0);
        this.testGrid.MovePiece(TypeOfMovement.LEFT);
        
        this.testGrid02 = new tetris.Grid(gameOptions.grid02PositionX, gameOptions.grid02PositionY);
        this.testGrid02.AddPiece(new tetris.lLPiece(), 1, 0);
        this.testGrid02.MovePiece(TypeOfMovement.LEFT);
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
        if(this.inputHandler.cursorsPlayer01.up.isDown && this.inputHandler.cursorsPlayer01.up.downDuration(1))
        {
            //this.testGrid.MovePiece(TypeOfMovement.DROP);
        }
        if(this.inputHandler.cursorsPlayer01.hold.isDown && this.inputHandler.cursorsPlayer01.hold.downDuration(1))
        {
            //this.testGrid.MovePiece(TypeOfMovement.FASTER);
        }
        if(this.inputHandler.cursorsPlayer01.rotate.isDown && this.inputHandler.cursorsPlayer01.rotate.downDuration(1))
        {
            this.testGrid.MovePiece(TypeOfMovement.ROTATE);
        }
        
        
        
        if(this.inputHandler.cursorsPlayer02.left.isDown && this.inputHandler.cursorsPlayer02.left.downDuration(1))
        {
            this.testGrid02.MovePiece(TypeOfMovement.LEFT);
        }
        //RIGHT
        else if(this.inputHandler.cursorsPlayer02.right.isDown && this.inputHandler.cursorsPlayer02.right.downDuration(1))
        {
            this.testGrid02.MovePiece(TypeOfMovement.RIGHT);
        }
        //DOWN Independent
        if(this.inputHandler.cursorsPlayer02.down.isDown && this.inputHandler.cursorsPlayer02.down.downDuration(1))
        {
            this.testGrid02.MovePiece(TypeOfMovement.FASTER);
        }
        if(this.inputHandler.cursorsPlayer02.up.isDown && this.inputHandler.cursorsPlayer02.up.downDuration(1))
        {
            //this.testGrid.MovePiece(TypeOfMovement.DROP);
        }
        if(this.inputHandler.cursorsPlayer02.hold.isDown && this.inputHandler.cursorsPlayer02.hold.downDuration(1))
        {
            //this.testGrid.MovePiece(TypeOfMovement.FASTER);
        }
        if(this.inputHandler.cursorsPlayer02.rotate.isDown && this.inputHandler.cursorsPlayer02.rotate.downDuration(1))
        {
            this.testGrid.MovePiece(TypeOfMovement.ROTATE);
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