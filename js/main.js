var tetris = tetris || {};

tetris.game = new Phaser.Game(128,256,Phaser.AUTO,null,this,false,false);

tetris.game.state.add('mainMenu', tetris.mainMenu);
tetris.game.state.add('inGame', tetris.inGame);
tetris.game.state.add('ranking', tetris.ranking);
tetris.game.state.add('endGame', tetris.endGame);

tetris.game.state.start('mainMenu');






