var tetris = tetris || {};
const RankingStates = {
    SHOWPLAYERSCORE: 0,
    SHOWRANKIGSCORES: 1,
    ENDSHOWSCORES: 2,
    CHANGENAMES: 3
}

tetris.ranking = {
    init:function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.creatButton = false;
        this.rankingStates = RankingStates.SHOWPLAYERSCORE;
    },
    preload:function(){
        //game.stage.backgroundColor = "#FF0000";
    },
    create:function(){
        this.buttonsText = [];
        this.RankingScores = [];
        //Flow buttons
    },
    update:function(){
        switch(this.rankingStates){
            case RankingStates.SHOWPLAYERSCORE:
                //Mostrar puntuacion del jugador ganador->
                break;
            case RankingStates.SHOWRANKIGSCORES:
                //Mostrar la tabla del ranking->
                break;
            case RankingStates.ENDSHOWSCORES:                
                if(this.creatButton == false){
                    this.creatButtonsBack();
                }
                break;
            case RankingStates.CHANGENAMES:
                
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
    CreatPlayerScore: function(g1, string, time, x, y, w, h, callback){
        
    },
    CreatTableOfScores: function(){
        
    },
    
    creatButtonsBack: function(){
        this.resetButton = this.createButton(this, "Reset", this.world.centerX - 155, this.world.centerY + 140, 150,40, function(){
            this.game.state.start('inGame');
        });
        this.menuButton = this.createButton(this, "Menu", this.world.centerX + 155, this.world.centerY + 140, 150,40, function(){
            this.game.state.start('mainMenu');
        });
        this.creatButton = true;
    }
};