var tetris = tetris || {};

tetris.myTimer = function(){
    this.eventArray = new Array(0);
    
    var debug = {
        name:"",
        index:-1,
        delay:0,
        context:{
            callBack:function(){}
        }
    };
    debug.name ="pene"
    debug.delay = 1000;
    debug.context = this;
    debug.context.callBack = this.TestFunc;
    debug.index = tetris.game.time.events.lenght+1;
    this.eventArray.push(debug);
    
    var gameEvent = tetris.game.time.events.loop(debug.delay, debug.context.callBack, debug.context);
};
 
tetris.myTimer.prototype = Object.create(tetris.myTimer.prototype);
tetris.myTimer.prototype.constructor = tetris.myTimer;

tetris.myTimer.prototype.TestFunc = function(){
    console.log("wow");
}