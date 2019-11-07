var tetris = tetris || {};


tetris.gameState = {
    
    preload:function(){
        //game.stage.backgroundColor = "#FF0000";
        var ruta = 'assets/img/';
    this.load.image('bg1',ruta+'background_back.png');
    this.load.image('bg2',ruta+'background_frontal.png');
    },
    create:function(){
        
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        
        //.stage.backgroundColor = "#FF0000";
        this.bg1 =this.game.add.tileSprite(0,0,128,256,'bg1');
        this.bg2=this.game.add.tileSprite(0,0,128,256,'bg2');
    },
    update:function(){
        this.bg1.tilePosition.y+=1;
        this.bg2.tilePosition.y+=2;
    }
};





