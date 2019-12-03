var tetris = tetris || {};

//var bt1;
tetris.mainMenu = {
    init:function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
    },
    preload:function(){
        var ruta = 'assets/img/';
        this.game.load.spritesheet('bt1', ruta+'button.png', 268, 101);
        this.game.stage.backgroundColor = '#182d3b';

        this.game.load.bitmapFont('tittleFont', 'assets/fonts/battle.png', 'assets/fonts/battle.fnt');


    },
    
    create:function(){
        
        this.title = tetris.game.add.bitmapText(this.world.centerX - 200, 100, 'tittleFont', 'BATTLE TETRIS', 110);
        this.title.tint = 0xFFFFFF;

        var bt2 = this.createButton(this, "Start", this.world.centerX, this.world.centerY, 150,40, function(){this.game.state.start('inGame');});
    },
    update:function(){
        
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
    }

};





