var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game-container');

game.load.image('heart', '/images/heart.png');
//preload the game states
game.state.add('boot', boot);
game.state.add('preload', preload);
game.state.add('logo', logo);
game.state.add('menu', menu);
game.state.add('char', char);
game.state.add('map', map);
//inst => instructions
game.state.add('inst', inst);
game.state.add('sett', sett);
game.state.add('store', store);
game.state.add('credit', credit);

game.state.start('boot');

//standard log to console
function log(tag, message)
{
    console.log("["+tag+"] : "+message);
}