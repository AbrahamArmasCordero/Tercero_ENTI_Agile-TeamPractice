var tetris = tetris || {};
const RankingStates = {
    SHOWPLAYERSCORE: 0,
    SHOWRANKIGSCORES: 1,
    CHANGENAMES: 2
}

tetris.ranking = {
    init:function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.creatButton = false;
        this.rankingStates = RankingStates.SHOWPLAYERSCORE;
        this.game.add.plugin(PhaserInput.Plugin);
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
    },
    update:function(){
        switch(this.rankingStates){
            case RankingStates.SHOWPLAYERSCORE:
                //Mostrar puntuacion del jugador ganador->
                    this.CreatPlayerScore(this, NameWinner.text, this.world.centerX, this.world.centerY, 200, 50 );
                break;
            case RankingStates.SHOWRANKIGSCORES:
                //Mostrar la tabla del ranking->
                    this.CreatTableOfScores();
                break;
            case RankingStates.CHANGENAMES:
                if(this.creatButton == false)
                    this.CreatTableOfCN();
                break;
        }
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
    
    CreatPlayerScore: function(g1, string, x, y, w, h){
        this.mainBg.kill;
        this.endBg.revive();
        this.endBg.bringToTop();
        
        this.pauseText = this.game.add.bitmapText(gameOptions.gameWidth/2, gameOptions.gameHeight/2 - 80, 'titleFont', "The winner is: ", 200);
        this.pauseText.anchor.setTo(0.5);
        
        this.winText = this.game.add.bitmapText(x-400, y , 'titleFont', string, 100);
        this.winTextI = this.game.add.bitmapText(x, y , 'titleFont', 'Score: ' + ScoreWinner, 100);

        this.creatButtonsBack();
    },
    
    CreatTableOfScores: function(){
        this.endBg.revive();
        this.endBg.bringToTop();
        this.pauseText = this.game.add.bitmapText(gameOptions.gameWidth/2, gameOptions.gameHeight/2 - 80, 'titleFont', "PAUSE", 200);
        this.pauseText.anchor.setTo(0.5);
    },
    
    CreatTableOfCN: function(){
        this.endBg.kill();
        this.winText.destroy();
        this.winTextI.destroy();
        
        this.pauseBg.revive();
        this.pauseBg.bringToTop();
        this.pauseText = this.game.add.bitmapText(gameOptions.gameWidth/2, gameOptions.gameHeight/2 - 80, 'titleFont', "Change Names", 200);
        this.pauseText.anchor.setTo(0.5);
                
        this.inputSprite01 = this.game.add.sprite(gameOptions.gameWidth/2 - 300,600,'inputText');
        this.inputSprite01.anchor.setTo(.5);
        this.inputSprite01.scale.setTo(1);
        this.inputSprite02 = this.game.add.sprite(gameOptions.gameWidth/2 + 300,600,'inputText');
        this.inputSprite02.anchor.setTo(.5);
        this.inputSprite02.scale.setTo(1);
        
        this.pj1InputText = this.game.add.inputField(gameOptions.gameWidth/2 - 300-(448/2), 600-30, {
            font: "50px Arial",
            fill: '#000000',
            fillAlpha: 0,
            fontWeight: 'bold',
            width: 448,
            height:159,
            max: 5,
            padding: 2,
            borderWidth: 1,
            borderColor: '#000',
            borderRadius: 6,
            placeHolder: pj1Name,
            textAlign: 'center',
            cursorColor : '#000000'
        });
        
        this.pj2InputText = this.game.add.inputField(gameOptions.gameWidth/2 + 300-(448/2), 600-30, {
            font: "50px Arial",
            fill: '#000000',
            fillAlpha: 0,
            fontWeight: 'bold',
            width: 448,
            height:159,
            max: 5,
            padding: 2,
            borderWidth: 1,
            borderColor: '#000',
            borderRadius: 6,
            placeHolder: pj2Name,
            textAlign: 'center',
            cursorColor : '#000000'
        });
        
        this.creatButtonsBack();
        
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
    
    checkName:function(name, comparison){
        if(name == null || name == "" || name == comparison){
            return false;
        }
        else{
            return true;
        }
    },
    startGame:function(){
        if(this.checkName(this.pj1InputText.value, this.pj2InputText.value) && this.checkName(this.pj2InputText.value, this.pj1InputText.value)){
            //set pj1 name
            pj1Name = this.pj1InputText.value
            //set pj2 name
            pj2Name = this.pj2InputText.value
            this.game.state.start('inGame');
        }
    }
};