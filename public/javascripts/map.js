/**
 * Created by laban on 2017-05-16.
 */
var map = {
    preload: function () {
        log('state','map')
        //load the icons for setting, store, instructions, health, mana, coins
        this.load.image('grass','/images/tiles/grass_placeholder.png');
        this.load.image('tile','/images/tiles/tile_placeholder.png');
        this.load.image('rouge', '/images//player/characters/rouge.png');
    },
    create: function () {
        this.physics.startSystem(Phaser.Physics.ARCADE);
        //contains the maps tiles/sprites
        var mapTiles = this.add.group();
        //contains the current players
        player.sprite = this.add.group();

        //hard coded tile dimensions
        var tileHeight = 20;
        var tileWidth = 20;
        for (var y = 0; y < game.height; y += tileHeight)
            for (var x = 0; x < game.width; x += tileWidth)
                    mapTiles.create(x, y, 'tile');

        //create/add player sprite to state
        player.sprite = this.add.sprite(game.width/2, game.height/2, 'rouge');
        //anchor player to middle
        player.sprite.anchor.setTo(0.5, 0.5);
        //enable arcade physics
        this.physics.enable(player.sprite, Phaser.Physics.ARCADE);
        player.sprite.scale.setTo(0.15, 0.15);
        //set the cursors to the users keyboard
        cursors = game.input.keyboard.createCursorKeys();
    },
    update: function() {
        console.log(player.sprite);
        //if the player is currently alive

        if (player.stats.currentHealth > 0)
        {
            //reset velocity
            player.sprite.body.velocity.setTo(0,0);
            //handle left movement
            if (cursors.left.isDown)
                player.sprite.body.velocity.x = -200;
            //handle right movement
            else if (cursors.right.isDown)
                player.sprite.body.velocity.x = 200;
            else if (cursors.up.isDown)
                player.sprite.body.velocity.y = -200;
            else if (cursors.down.isDown)
                player.sprite.body.velocity.y = 200;
        }
    }
};