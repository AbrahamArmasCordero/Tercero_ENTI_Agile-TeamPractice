var tetris = tetris || {};

//var bt1;
tetris.mainMenu = {
    init:function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.game.add.plugin(PhaserInput.Plugin);
    },
    preload:function(){
        var ruta = 'assets/img/';
        this.game.load.spritesheet('bt1', ruta + 'frameLayout/ButtonSpriteSheet.png', 256, 128);
        
        
        this.load.image("inputText", ruta + 'frameLayout/inputText.png');
        this.load.image("mainBg", ruta + 'backgrounds/MainMenu.png');
            
        this.game.load.bitmapFont('tittleFont', 'assets/fonts/battle.png', 'assets/fonts/battle.fnt');
    },
    
    create:function(){
        
        this.bg = this.game.add.sprite(0,0,"mainBg");
        this.bg.width = gameOptions.gameWidth;
        this.bg.height = gameOptions.gameHeight;
        this.title = tetris.game.add.bitmapText(this.world.centerX - 220, 150, 'tittleFont', 'BATTLE TETRIS', 110);
        this.title.tint = 0xFFFFFF;
        
        this.inputSprite01 = this.game.add.sprite(gameOptions.gameWidth/2 - 300,600,'inputText');
        this.inputSprite01.anchor.setTo(.5);
        this.inputSprite01.scale.setTo(1);
        this.inputSprite02 = this.game.add.sprite(gameOptions.gameWidth/2 + 300,600,'inputText');
        this.inputSprite02.anchor.setTo(.5);
        this.inputSprite02.scale.setTo(1);

        var bt2 = this.createButton(this, "Start", this.world.centerX, this.world.centerY, 150,80., this.startGame);
        
        
        this.pj1Text = tetris.game.add.bitmapText(gameOptions.gameWidth/2 - 500, 450,'tittleFont', 'PJ1', 110);
        this.pj1Text.tint = '#000000';
        
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
            placeHolder: '<Insert>',
            placeHolderColor:'#000000',
            textAlign: 'center',
            cursorColor : '#000000'
        });
        
        this.pj2Text = tetris.game.add.bitmapText(gameOptions.gameWidth/2 + 100, 450,'tittleFont', 'PJ2', 110);
        this.pj2Text.tint = '#000000';
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
            placeHolder: '<Insert>',
            placeHolderColor:'#000000',
            textAlign: 'center',
            cursorColor : '#000000'
        });
        
        
        
    },
    update:function(){
        
    },
    
    //Creates a button given the game and his basic propierties
    createButton: function(g1, string, x,y,w,h,callback){
        var btn = g1.add.button(x,y, 'bt1', callback, this, 1,0,0);
        btn.anchor.setTo(0.5,0.5);
        btn.width = w;
        btn.height = h;
        
        var txt = g1.add.text(btn.x, btn.y, string,{font: "50px Arial",
                                                   fill: "#000",
                                                    stroke:"#FFF",
                                                    strokeThickness:2,
                                                   align: "center"});
        txt.addColor(0,"#00FF00");
        txt.anchor.setTo(0.5,0.5);
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
        if(this.checkName(this.pj1InputText.value,this.pj2InputText.value) && this.checkName(this.pj2InputText.value,this.pj1InputText.value)){
            //set pj1 name
            pj1Name = this.pj1InputText.value
            //set pj2 name
            pj2Name = this.pj2InputText.value
            this.game.state.start('inGame');
        }
    }
};







