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
        this.game.load.bitmapFont('tittleFont', 'assets/fonts/battle.png', 'assets/fonts/battle.fnt');
        
    },
    create:function(){
        this.buttonsText = [];
        this.RankingScores = [];
        //Flow buttons
        this.title = tetris.game.add.bitmapText(this.world.centerX - 200, 50, 'tittleFont', 'RANKING', 110);
        this.CreatTableOfScores();
        
        //Flow buttons
        if(this.creatButton == false){
            this.creatButtonsBack();
        }
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
        var ranking = JSON.parse(localStorage.getItem("ranking"));
        
        for(var i = 0; i < ranking.length; i++){
            var text = tetris.game.add.bitmapText(this.world.centerX - 200, 200+100*i, 'tittleFont', ranking[i].name+' '+ ranking[i].score, 70);
            this.RankingScores.push(text);
        }
    },
        
    creatButtonsBack: function(){
                this.resetButton = this.createButton(this, "Play Again", this.world.centerX - 450, this.world.centerY - 50 , 190, 45, function(){
                    this.game.state.start('inGame'); 
                });
                this.mainButton = this.createButton(this, "Main Menu", this.world.centerX - 450, this.world.centerY + 50 , 190, 45, function(){
                        this.game.state.start('mainMenu');
                });
        this.creatButton = true;
    }
};