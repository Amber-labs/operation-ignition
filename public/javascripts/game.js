var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game-container', { preload: preload, create: create, update: update });

function preload() {
    game.load.image('heart', '/images/heart.png');
}

function create() {
    game.add.sprite(0, 0, 'heart');
}

function update() {
}