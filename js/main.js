var tetris = tetris || {};

var pj1Name = null;
var pj2Name = null;
var ScoreWinner = null;
var NameWinner = null;
tetris.game = new Phaser.Game(gameOptions.gameWidth, gameOptions.gameHeight,Phaser.AUTO,null,this,false,false);

tetris.game.state.add('mainMenu', tetris.mainMenu);
tetris.game.state.add('inGame', tetris.inGame);
tetris.game.state.add('ranking', tetris.ranking);
tetris.game.state.add('endGame', tetris.endGame);

tetris.game.state.start('mainMenu');





