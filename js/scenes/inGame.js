var tetris = tetris || {};

var difficulty;
var estate;
var player01;
var player02;

tetris.inGame = {
    
    preload:function(){
        //game.stage.backgroundColor = "#FF0000";
        var ruta = 'assets/img/';
        this.load.image('bg1',ruta+'backgrounds/background_back.png');
        this.load.image('bg2',ruta+'backgrounds/background_frontal.png');
        
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
        
        estate = 1;
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        
        this.bg1 = this.game.add.tileSprite(0,0,128,256,'bg1');
        this.bg2 = this.game.add.tileSprite(0,0,128,256,'bg2');
        
        switch(difficulty){
            case 0: //FACIL
                break;
            case 1: //NORMAL
                break;
            case 2: //DIFICIL
                break;
            case 3: //MUY DIFICIL
                break;
        }
    },
    update:function(){
        switch(estate){
            case 0: //Timer para que los dos jugadores esten a punto. Aun no hay que hacerlo.
                break;
            case 1: //Empieza la partida
                this.play();
                break;
            case 2: //Detenemos el curso del juego
                this.pause();
                break;
            case 3: //Finalizamos la partida
                this.end();
                break;
            case 4: //Reiniciamos la partida
                this.reset();
                break;
        }
        
    },
    
    play:function(){
        this.bg1.tilePosition.y+=1;
        this.bg2.tilePosition.y+=2;
        //Play
    },
    pause:function(){
        //Pause
    },
    end:function(){
        this.game.state.start('endGame');
        //Finalizar
    },
    reset:function(){
        //Reiniciar  
    },
};