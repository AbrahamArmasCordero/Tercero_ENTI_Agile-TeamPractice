var tetris = tetris || {};

var difficulty;
var estate;
var player01;
var player02;

tetris.inGame = {
    init:function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
    },
    preload:function(){
        //game.stage.backgroundColor = "#FF0000";
        var ruta = 'assets/img/';
        this.load.image('grid_bg', ruta+'grid_sprite320x640.png')
    },
    create:function(){
        
        estate = 1;
        this.pj1GridBG = this.game.add.image(182,82, 'grid_bg');
        this.pj2GridBG = this.game.add.image(864,82, 'grid_bg');
        
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