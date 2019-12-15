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
        this.load.image("pause_bg", ruta + 'backgrounds/background_pause.png');  
        //Load End state
         this.load.image('end_bg', ruta + 'backgrounds/endBackground.png');
        this.load.image('background_endAnimated', ruta + 'backgrounds/background_endAnimated.png');
        //Bg
         this.load.image('main_bg', ruta+'backgrounds/background_ingame.png');
    },
    create:function(){
         //BG
        this.mainBg = this.game.add.tileSprite(0,0,gameOptions.gameWidth,gameOptions.gameHeight, 'main_bg');
        
        //Inputs
        this.inputHandler = new tetris.inputManager(tetris.game);
        
        //Players
        this.player1 = new tetris.Player(this.inputHandler.cursorsPlayer01, 
                                         gameOptions.grid01PositionX,
                                         gameOptions.grid01PositionY, pj1Name,
                                         gameOptions.grid01PositionX - gameOptions.pieceFramePixSize,250);
        
        this.player2 = new tetris.Player(this.inputHandler.cursorsPlayer02, 
                                         gameOptions.grid02PositionX,
                                         gameOptions.grid02PositionY, pj2Name,
                                         gameOptions.grid02PositionX+ gameOptions.cellWidth* gameOptions.gridCellWidthCount+8,250);
        
        this.timerText = this.game.add.bitmapText(gameOptions.gameWidth/2, gameOptions.gameHeight/2, 'titleFont', "", 64);
        this.timerText.anchor.setTo(0.5);
        
        this.level = 1;
        this.levelText = this.game.add.bitmapText(gameOptions.gameWidth/2, gameOptions.gameHeight/2 + 100, 'titleFont', "Level: 1", 64);
        this.levelText.anchor.setTo(0.5);
        
        this.currentTime = 0;
 
        //End 
        this.endBg = this.game.add.tileSprite(0,0,gameOptions.gameWidth,gameOptions.gameHeight, 'end_bg');
        this.endBg.kill();
        this.endAnimBg = this.game.add.sprite(gameOptions.gameWidth/2,gameOptions.gameHeight/2, 'background_endAnimated');
        this.endAnimBg.anchor.setTo(0.5);
        this.endAnimBg.kill();
        //Pause
        this.pauseBg = this.game.add.tileSprite(0,0,gameOptions.gameWidth,gameOptions.gameHeight, 'pause_bg');
        this.pauseBg.kill();
        
        //Start
        this.game.time.events.add(Phaser.Timer.SECOND * 3, this.toPlayState, this);
        this.startCounter = 3;
        this.starTimer = this.game.add.bitmapText(gameOptions.gameWidth/2, gameOptions.gameHeight/2, 'titleFont', "3", 64);
        this.starTimer.anchor.setTo(0.5);
        this.startEvent = this.game.time.events.loop(Phaser.Timer.SECOND, this.updateStartTimer, this);
        
        //Buttons
        this.buttonsText = [];
        var timemultp = 1.0;
        var lastTime = 0;
        
        //Music
        if(!gameMusic.isPlaying)
            gameMusic.play();
    },
    update:function(){
        
        switch(this.playingState){
            case PlayingStates.COUNTDOWN:
                break;
            case PlayingStates.PLAY:
                if(this.inputHandler.pause.isDown && this.inputHandler.pause.downDuration(1)){
                    this.toPauseState();
                    console.log("Pause");
                }                
                this.player1.PjUpdate();
                this.player2.PjUpdate();
                if(this.player1.CheckLose()){
                    this.saveRanking(pj2Name, this.player2.score);
                    this.toEndState(pj2Name);
                    break;
                }
                if(this.player2.CheckLose()){
                    this.saveRanking(pj1Name, this.player1.score);
                    this.toEndState(pj1Name);
                    break;
                }
                break;
            case PlayingStates.PAUSE:
                if(this.inputHandler.pause.isDown && this.inputHandler.pause.downDuration(1)){
                    this.toResumePlay();
                }
                break;
            case PlayingStates.END:
                this.endAnimBg.angle += 0.6;
                break;
        }
    },
    toEndState: function(name){
        this.playingState = PlayingStates.END;
        
        
        this.endBg.revive();
        this.endBg.bringToTop();
        this.endAnimBg.revive();
        this.endAnimBg.bringToTop();
        
        this.player1.myGrid.PauseTimer();
        this.player2.myGrid.PauseTimer();
        
        this.game.time.events.removeAll();
        this.createEndParticles();
        
        //End Tittle
    this.winTitle = this.game.add.bitmapText( gameOptions.gameWidth/2, gameOptions.gameHeight/2 - 100, 'titleFont', name + ' wins', 80);
        if(name == this.player1.nameText){
            ScoreWinner = this.player1.score;
            NameWinner = this.player1.nameText;
        }
        else{
            ScoreWinner = this.player2.score;
            NameWinner = this.player2.nameText;
        }
        this.winTitle.fill = '#43fd38';
        this.winTitle.anchor.setTo(.5);
        this.winTitle.stroke = '#ffffff';
        this.winTitle.strokeThickness = 5;
        //Buttons
        var resetButton = this.createButton(this, "Reset", this.world.centerX - 120, this.world.centerY + 80, 200,80, function(){this.game.state.start('inGame');});
        var rankingButton = this.createButton(this, "Ranking", this.world.centerX + 120, this.world.centerY + 80, 200,80, function(){this.game.state.start('ranking');});

    },
    toPlayState: function(){
        this.playingState = PlayingStates.PLAY;
        this.player1.myGrid.ResumeTimer();
        this.player2.myGrid.ResumeTimer();

        this.timerEvent = this.game.time.events.loop(Phaser.Timer.SECOND, this.updateTimer, this);
    },
    toPauseState: function(){
        this.playingState = PlayingStates.PAUSE;
        this.pauseBg.revive();
        this.pauseBg.bringToTop();
        this.pauseText = this.game.add.bitmapText(gameOptions.gameWidth/2, gameOptions.gameHeight/2 - 80, 'titleFont', "PAUSE", 200);
        this.pauseText.anchor.setTo(0.5);
        tetris.game.time.events.pause();
        
        this.resetInPause = this.createButton(this, "Reset", this.world.centerX - 200, this.world.centerY + 140, 200,80, function(){
            tetris.game.time.events.resume();
            this.game.state.start('inGame');
        });
        
        this.resumeInPause = this.createButton(this, "Resume", this.world.centerX, this.world.centerY + 140, 200,80, function(){this.toResumePlay();});
        
        this.menuInPause = this.createButton(this, "Menu", this.world.centerX + 200, this.world.centerY + 140, 200,80, function(){
            tetris.game.time.events.resume();
            this.game.state.start('mainMenu');
        });
    },
    toResumePlay: function(){
        this.playingState = PlayingStates.PLAY;
        this.pauseBg.kill();
        this.pauseText.destroy();
        
        this.menuInPause.kill();
        this.resetInPause.destroy();
        this.resumeInPause.destroy();
        for(var i = 0; i< this.buttonsText.length; i++){
            this.buttonsText[i].destroy();
        }
        
        tetris.game.time.events.resume();
    },
    //Creates a button given the game and his basic propierties
    createButton: function(g1, string, x,y,w,h,callback){
        var btn = g1.add.button(x,y, 'bt1', callback, this, 2,1,0);
        btn.anchor.setTo(0.5,0.5);
        btn.width = w;
        btn.height = h;
        
        var txt = g1.add.text(btn.x, btn.y, string,{font: "50px Arial",fill: "#000",align: "center",stroke:"#FFF",
                                                    strokeThickness:2});
        txt.anchor.setTo(0.5,0.5);
        
        this.buttonsText.push(txt);
        return btn;
    },
    updateTimer:function(){
        this.currentTime++;
        var minutes = Math.floor((this.currentTime/60));
        var seconds = this.currentTime - minutes*60;
        if(minutes != 0 || seconds != 0){
            if(seconds%30 == 0){
                this.player1.myGrid.IncreaseSpeed();
                this.player2.myGrid.IncreaseSpeed();
                if(this.level <= 9){
                    this.level++;
                    this.levelText.text = String.format("Level: {0:0}",this.level);
                }
            }
        }
        this.timerText.text = String.format("{0:00}:{1:00}", minutes, seconds);

    },
    updateStartTimer:function(){
        this.startCounter--;
        var minutes = Math.floor((this.startCounter/60));
        var seconds = this.startCounter - minutes*60;
           
        this.starTimer.text = String.format("{0}", seconds);
        
        if(minutes <= 0 && seconds <= 0){
            this.startEvent.timer.remove(this.startEvent);
            this.starTimer.destroy();
            this.timerText.text = "00:00";
        }
    },
    createEndParticles:function(){
        //Particles
        this.emitter = this.game.add.emitter(this.game.world.centerX, -20, 100);

        this.emitter.makeParticles([SpriteFullIMG[SpriteID.I], SpriteFullIMG[SpriteID.O], SpriteFullIMG[SpriteID.T],SpriteFullIMG[SpriteID.L.Left], SpriteFullIMG[SpriteID.L.Right],SpriteFullIMG[SpriteID.Z.Left],SpriteFullIMG[SpriteID.Z.Right]]);

        this.emitter.minParticleSpeed.setTo(-20, 20);
        this.emitter.maxParticleSpeed.setTo(20, 100);
        this.emitter.setYSpeed(20, 100);
        this.emitter.minParticleScale = 0.2;
        this.emitter.maxParticleScale = 0.8;
        this.emitter.gravity = 10;
        this.emitter.setAlpha(0.1, 1, 5000);
        this.emitter.setScale(0.1, 1, 0.1, 1, 6000, Phaser.Easing.Quintic.Out);
        this.emitter.width = this.game.world.width * 1.5;
        //(Vida de particula, cada 800ms, 4particulas, loop)
        this.emitter.flow(10000, 300, 2, -1);
    },
    saveRanking:function(name, score){
        //sacar el ranking
        var ranking = JSON.parse(localStorage.getItem("ranking"));
        if(ranking == null){
            ranking = [];
        }
        //guardar name y score en el ranking
        var highScore ={
            name:name,
            score:score
        }
        ranking.push(highScore);
        //ordenar ranking
        ranking.sort(function (a, b) {
           if (a.score < b.score) 
           {
               return 1;
           }
           if (a.score > b.score)
           {
               return-1;
           }
           return 0;
        });
        //remove excess
        if(ranking.length >= 6){
            ranking.splice( 5, 5 );
        }
        //guardar
        var json = JSON.stringify(ranking);
        localStorage.setItem("ranking", json);
    },
};