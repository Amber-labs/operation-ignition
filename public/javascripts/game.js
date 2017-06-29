var game = new Phaser.Game(1280, 720, Phaser.AUTO, 'game-container');
var player;
var classes;

$.ajax({url: '/api/players/data',async: false, success: function(doc) {
    log('player',JSON.stringify(doc));
    player = doc;
}});

$.ajax({
    url: '/api/classes/data',
    type: 'GET',
    success: function (doc)
    {
        log('classes', JSON.stringify(doc));
        classes = doc;
    }
});

//add the game states
game.state.add('boot', boot);
game.state.add('preload',preload);
game.state.add('characterCreate', characterCreate);
game.state.add('map', map);
/*
game.state.add('logo', logo);
game.state.add('menu', menu);
game.state.add('char', char);

//inst => instructions
game.state.add('inst', inst);
game.state.add('sett', sett);
game.state.add('store', store);
game.state.add('credit', credit);
*/

game.state.start('boot');