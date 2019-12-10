var tetris = tetris || {};


tetris.ranking = {
    init:function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.creatButton = false;
    },
    preload:function(){
        var ruta = 'assets/img/';
        this.game.load.spritesheet('bt1', ruta + 'button.png', 268, 101);
        
        this.game.load.bitmapFont('titleFont', 'assets/fonts/battle.png', 'assets/fonts/battle.fnt'); 

        this.load.image("inputText", ruta + 'frameLayout/inputText.png');
        this.game.load.bitmapFont('tittleFont', 'assets/fonts/battle.png', 'assets/fonts/battle.fnt');
        
                //Load Pause state
        this.load.image("ShowResults", ruta + 'backgrounds/background_pause.png');  
        //Load End state
        this.load.image('ShowRanking', ruta + 'backgrounds/endBackground.png');
        //Bg
        this.load.image('ChangeNames', ruta+'backgrounds/background_ingame.png');
        //game.stage.backgroundColor = "#FF0000";
        this.game.load.bitmapFont('tittleFont', 'assets/fonts/battle.png', 'assets/fonts/battle.fnt');
    },
    create:function(){
        this.mainBg = this.game.add.tileSprite(0,0,gameOptions.gameWidth,gameOptions.gameHeight, 'ShowResults');

        this.buttonsText = [];
        this.RankingScores = [];
        
        this.endBg = this.game.add.tileSprite(0,0,gameOptions.gameWidth,gameOptions.gameHeight, 'ChangeNames');
        this.endBg.kill();
        //Pause
        this.pauseBg = this.game.add.tileSprite(0,0,gameOptions.gameWidth,gameOptions.gameHeight, 'ShowRanking');
        var inputSprite01 = null;
        var inputSprite02 = null;
        var pj2InputText = null;
        var pj1InputText = null;        
        this.pauseBg.kill();

        //Flow buttons
        this.CreatTableOfScores();
        if(this.creatButton == false){
            this.creatButtonsBack();
        }
        this.title = tetris.game.add.bitmapText(this.world.centerX - 200, 50, 'tittleFont', 'RANKING', 110);
    },
    update:function(){

    },
    //Creates a button given the game and his basic propierties
    createButton: function(g1, string, x,y,w,h,callback){
        var btn = g1.add.button(x,y, 'bt1', callback, this, 2,1,0);
        btn.anchor.setTo(0.5,0.5);
        btn.width = w;
        btn.height = h;
        
        var txt = g1.add.text(btn.x, btn.y, string,{font: "25px Arial",fill: "#000",align: "center"});
        txt.anchor.setTo(0.5,0.5);
        this.buttonsText.push(txt);
        return btn;
    },
    
    SaveRankingValues: function(){
        
    },

    CreatTableOfScores: function(){
        this.endBg.revive();
        this.endBg.bringToTop();
        this.pauseText = this.game.add.bitmapText(gameOptions.gameWidth/2, gameOptions.gameHeight/2 - 80, 'titleFont', "PAUSE", 200);
        this.pauseText.anchor.setTo(0.5);
    },
    CreatTableOfScores: function(){
        var ranking = JSON.parse(localStorage.getItem("ranking"));
        
        for(var i = 0; i < ranking.length; i++){
            var text = tetris.game.add.bitmapText(this.world.centerX - 200, 200+100*i, 'tittleFont', ranking[i].name+' '+ ranking[i].score, 70);
            this.RankingScores.push(text);
        }
    },
    
    creatButtonsBack: function(){
        switch(this.rankingStates){
            case RankingStates.SHOWPLAYERSCORE:
                this.resetButton = this.createButton(this, "Play Again", this.world.centerX - 250, this.world.centerY+140 , 190, 45, function(){
                if(this.rankingStates == RankingStates.SHOWPLAYERSCORE)
                    if(this.checkName(pj1Name, pj2Name) && this.checkName(pj2Name, pj1Name)){
                        this.game.state.start('inGame');
                    }
                });
                this.menuButton = this.createButton(this, "Change Names", this.world.centerX, this.world.centerY+140, 190, 45, function(){
                    if(this.rankingStates == RankingStates.SHOWPLAYERSCORE){
                        this.rankingStates = RankingStates.CHANGENAMES;
                        this.creatButton = false;
                    }
                });
                this.mainButton = this.createButton(this, "Main Menu", this.world.centerX + 250, this.world.centerY+140 , 190, 45, function(){
                    if(this.rankingStates == RankingStates.SHOWPLAYERSCORE)
                        this.game.state.start('mainMenu');
                });
                this.creatButton = true;
                
                break;
            case RankingStates.CHANGENAMES:
                this.resetButton.destroy();
                this.menuButton.destroy();
                this.mainButton.destroy();
                
                this.StartButton = this.createButton(this, "Play", this.world.centerX , this.world.centerY , 190, 45, function(){
                    this.startGame();
                });
                this.creatButton = true;
                break;
                
        }
    },
    
    creatButtonsBack: function(){
                this.resetButton = this.createButton(this, "Play Again", this.world.centerX - 250, this.world.centerY+140 , 190, 45, function(){
                    this.game.state.start('inGame'); 
                });
                this.mainButton = this.createButton(this, "Main Menu", this.world.centerX + 250, this.world.centerY+140 , 190, 45, function(){
                        this.game.state.start('mainMenu');
                });
        this.creatButton = true;
    }
};