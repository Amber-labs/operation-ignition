var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game-container');

game.state.add('boot', boot);
game.state.add('preload',preload);

game.state.start('boot');

//standard log to console
function log(tag, message)
{
    console.log("["+tag+"] : "+message);
}