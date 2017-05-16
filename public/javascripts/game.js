var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game-container', { preload: preload, create: create, update: update });

function preload() {
    game.load.image('heart', '/images/heart.png');

    //preload the game states
    game.state.add('boot', boot);
    game.state.add('load', load);
    game.state.add('logo', logo);
    game.state.add('menu', menu);
    game.state.add('char', char);
    game.state.add('map', map);
    //inst => instructions
    game.state.add('inst', inst);
    game.state.add('sett', sett);
    game.state.add('store', store);
    game.state.add('credit', credit);

}

function create() {
    game.add.sprite(0, 0, 'heart');
}

function update() {
}