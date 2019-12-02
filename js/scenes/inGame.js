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
        this.playingState = PlayingStates.COUNTDOWN;
    },
    preload:function(){
        var ruta = 'assets/img/';
        //font
        this.game.load.bitmapFont('titleFont', 'assets/fonts/battle.png', 'assets/fonts/battle.fnt'); 
        
        //Load Play state
        this.load.image('grid_bg', ruta+'grid_sprite320x640.png');
        
        this.load.image(SpriteIMG[SpriteID.I], ruta+ 'tetriminos/IPiece32x32.png');
        this.load.image(SpriteIMG[SpriteID.L.Left], ruta + 'tetriminos/LLeftPiece32x32.png');
        this.load.image(SpriteIMG[SpriteID.L.Right], ruta + 'tetriminos/LRightPiece32x32.png');
        this.load.image(SpriteIMG[SpriteID.O], ruta+ 'tetriminos/OPiece32x32.png');
        this.load.image(SpriteIMG[SpriteID.T], ruta + 'tetriminos/TPiece32x32.png');
        this.load.image(SpriteIMG[SpriteID.Z.Left], ruta + 'tetriminos/ZLeftPiece32x32.png');
        this.load.image(SpriteIMG[SpriteID.Z.Right], ruta + 'tetriminos/ZRightPiece32x32.png');   
        
        
        //pieceFrame Components
        this.load.image('pieceFrame', ruta+'frameLayout/frame128x128.png');
        
        this.load.image(SpriteFullIMG[SpriteID.I], ruta + 'frameLayout/iPiece.png');
        this.load.image(SpriteFullIMG[SpriteID.L.Left], ruta + 'frameLayout/lLPiece.png');
        this.load.image(SpriteFullIMG[SpriteID.L.Right], ruta + 'frameLayout/lRPiece.png');
        this.load.image(SpriteFullIMG[SpriteID.O], ruta + 'frameLayout/oPiece.png');
        this.load.image(SpriteFullIMG[SpriteID.T], ruta + 'frameLayout/tPiece.png');
        this.load.image(SpriteFullIMG[SpriteID.Z.Left], ruta + 'frameLayout/zLPiece.png');
        this.load.image(SpriteFullIMG[SpriteID.Z.Right], ruta + 'frameLayout/zRPiece.png');   
        //Load Pause state
        
        //Load End state
         this.load.image('end_bg', ruta + 'backgrounds/endBackground.png');
    },
    create:function(){
              
        //Inputs
        this.inputHandler = new tetris.inputManager(tetris.game);
        
        //Players
        this.player1 = new tetris.Player(this.inputHandler.cursorsPlayer01, 
                                         gameOptions.grid01PositionX,
                                         gameOptions.grid01PositionY);
        
        this.player2 = new tetris.Player(this.inputHandler.cursorsPlayer02, 
                                         gameOptions.grid02PositionX,
                                         gameOptions.grid02PositionY);
        
        this.timerText = this.game.add.bitmapText(gameOptions.gameWidth/2, gameOptions.gameHeight/2, 'titleFont', "", 64);
        this.timerText.anchor.setTo(0.5);
        
        this.currentTime = 180;
           
        //End 
        this.endBg = this.game.add.tileSprite(0,0,gameOptions.gameWidth,gameOptions.gameHeight, 'end_bg');
        this.endBg.kill();

        
        //Start
        this.game.time.events.add(Phaser.Timer.SECOND * 3, this.toPlayState, this);
        this.startCounter = 3;
        this.starTimer = this.game.add.bitmapText(gameOptions.gameWidth/2, gameOptions.gameHeight/2, 'titleFont', "3", 64);
        this.starTimer.anchor.setTo(0.5);
        this.startEvent = this.game.time.events.loop(Phaser.Timer.SECOND, this.updateStartTimer, this);
    },
    update:function(){
        
        switch(this.playingState){
            case PlayingStates.COUNTDOWN:
                break;
            case PlayingStates.PLAY:
                this.player1.PjUpdate();
                this.player2.PjUpdate();
                if(this.player1.CheckLose()){
                    this.toEndState("Player 2");
                    break;
                }
                if(this.player2.CheckLose()){
                    this.toEndState("Player 1");
                    break;
                }
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
    toWin:function(){
        
    },
    toEndState: function(name){
        this.playingState = PlayingStates.END;
        
        this.endBg.revive();
        this.endBg.bringToTop();
    
        this.player1.myGrid.PauseTimer();
        this.player2.myGrid.PauseTimer();
        
        this.game.time.events.removeAll();
        
        //End Tittle
        this.winTitle = this.game.add.bitmapText( gameOptions.gameWidth/2, gameOptions.gameHeight/2 - 100, 'titleFont', name + ' wins', 80);
        this.winTitle.fill = '#43fd38';
        this.winTitle.anchor.setTo(.5);
        this.winTitle.stroke = '#ffffff';
        this.winTitle.strokeThickness = 5;
        
        var resetButton = this.createButton(this, "Reset", this.world.centerX - 100, this.world.centerY + 80, 150,40, function(){this.game.state.start('inGame');});
        var menuButton = this.createButton(this, "Menu", this.world.centerX + 100, this.world.centerY + 80, 150,40, function(){this.game.state.start('mainMenu');});
    },
    toPlayState: function(){
        this.playingState = PlayingStates.PLAY;
        this.player1.myGrid.ResumeTimer();
        this.player2.myGrid.ResumeTimer();
        this.timerEvent = this.game.time.events.loop(Phaser.Timer.SECOND, this.updateTimer, this);
    },
    //Creates a button given the game and his basic propierties
    createButton: function(g1, string, x,y,w,h,callback){
        var btn = g1.add.button(x,y, 'bt1', callback, this, 2,1,0);
        btn.anchor.setTo(0.5,0.5);
        btn.width = w;
        btn.height = h;
        
        var txt = g1.add.text(btn.x, btn.y, string,{font: "25px Arial",
                                                   fill: "#000",
                                                   align: "center"});
        txt.anchor.setTo(0.5,0.5);
    },
    updateTimer:function(){
        this.currentTime--;
        var minutes = Math.floor((this.currentTime/60));
        var seconds = this.currentTime - minutes*60;
           
        this.timerText.text = String.format("{0}:{1:00}", minutes, seconds);
        
        if(minutes <= 0 && seconds <= 0){
            this.timerEvent.timer.remove(this.timerEvent);
            this.toEndState();
        }
    },
    updateStartTimer:function(){
        this.startCounter--;
        var minutes = Math.floor((this.startCounter/60));
        var seconds = this.startCounter - minutes*60;
           
        this.starTimer.text = String.format("{0}", seconds);
        
        if(minutes <= 0 && seconds <= 0){
            this.startEvent.timer.remove(this.startEvent);
            this.starTimer.destroy();
            this.timerText.text = "3:00";
        }
    },
};