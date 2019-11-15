var tetris = tetris || {};

//var bt1;
tetris.mainMenu = {

    preload:function(){
        var ruta = 'assets/img/';
        this.game.load.spritesheet('bt1', ruta+'button.png', 268, 101);
        this.game.stage.backgroundColor = '#182d3b';
        //LoadAllTetriminions
        this.load.image('IPiece', ruta + '/tetriminios/IPiece32x32.png');
        this.load.image('LLPiece', ruta + '/tetriminios/LLeftPiece32x32.png');
        this.load.image('LRPiece', ruta + '/tetriminios/LRightPiece32x32.png');
        this.load.image('OPiece', ruta + '/tetriminios/OPiece32x32.png');
        this.load.image('TPiece', ruta + '/tetriminios/TPiece32x32.png');
        this.load.image('ZLPiece', ruta + '/tetriminios/ZLeftPiece32x32.png');
        this.load.image('ZRPiece', ruta + '/tetriminios/ZRightPiece32x32.png');

    },
    
    create:function(){
        
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        
        this.add.text( this.world.centerX - 150, 100, "BATTLE TETRIS", {font: "42px Arial",
                                                fill: "#fff",
                                                align: "center"});
        
        var bt1 = this.createButton(this, "Exit", this.world.centerX, this.world.centerY +80, 150, 40, function(){  this.game.destroy(); }); // Change Console.Log por la accion de cerrar.

        var bt2 = this.createButton(this, "Start", this.world.centerX, this.world.centerY, 150,40, function(){this.game.state.start('inGame');});
    },
    update:function(){
        
    },
    
    createButton: function(g1, string, x,y,w,h,callback){
        var btn = g1.add.button(x,y, 'button', callback, this, 2,1,0);
        btn.anchor.setTo(0.5,0.5);
        btn.width = w;
        btn.height = h;
        
        var txt = g1.add.text(btn.x, btn.y, string,{font: "25px Arial",
                                                   fill: "#fff",
                                                   align: "center"});
        txt.anchor.setTo(0.5,0.5);
    }

};





