var tetris = tetris || {};


tetris.ranking = {
    
    preload:function(){
        //game.stage.backgroundColor = "#FF0000";
    },
    create:function(){
        
        
        //Flow buttons
        this.resetButton = this.createButton(this, "Reset", this.world.centerX - 155, this.world.centerY + 140, 150,40, function(){
            this.game.state.start('inGame');
        });
        this.menuButton = this.createButton(this, "Menu", this.world.centerX + 155, this.world.centerY + 140, 150,40, function(){
            this.game.state.start('mainMenu');
        });
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
        
        return btn;
    },
};