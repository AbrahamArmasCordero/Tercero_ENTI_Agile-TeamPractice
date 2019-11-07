var tetris = tetris || {};


tetris.mainMenu = {
    
    preload:function(){
        //game.stage.backgroundColor = "#FF0000";
    },
    create:function(){
    },
    update:function(){
        this.game.state.start('inGame');
    }
};





