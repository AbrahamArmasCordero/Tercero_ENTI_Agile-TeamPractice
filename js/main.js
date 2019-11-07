var tetris = tetris || {};

tetris.game = new Phaser.Game(128,256,Phaser.AUTO,null,this,false,false);

tetris.game.state.add('main',tetris.gameState);
tetris.game.state.start('main');






