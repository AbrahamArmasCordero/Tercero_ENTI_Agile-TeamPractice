var tetris = tetris || {};


//var bt1;
tetris.mainMenu = {

    preload:function(){
        var ruta = 'assets/img/';
        this.game.load.spritesheet('bt1', ruta+'button.png', 268, 101);
        this.game.stage.backgroundColor = '#182d3b';


        
    },
    
    create:function(){
        
        this.add.text(237,100, "BATTLE TETRIS", {font: "42px Arial",
                                                fill: "#fff",
                                                align: "center"});
        
        var bt1 = this.createButton(this, "Exit", this.world.centerX, this.world.centerY +80, 150, 40, function(){ console.log("Exit"); }); // Change Console.Log por la accion de cerrar.

        var bt2 = this.createButton(this, "Start", this.world.centerX, this.world.centerY, 150,40, function(){this.game.state.start('inGame');});
        
        
    },
    update:function(){
        //this.game.state.start('inGame');
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





