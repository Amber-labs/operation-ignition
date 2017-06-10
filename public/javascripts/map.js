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
        socket.emit('new player', player.username);
        this.physics.startSystem(Phaser.Physics.ARCADE);
        //contains the maps tiles/sprites
        var mapTiles = this.add.group();
        players = game.add.group();

        //hard coded tile dimensions
        var tileHeight = 20;
        var tileWidth = 20;
        for (var y = 0; y < game.height; y += tileHeight)
            for (var x = 0; x < game.width; x += tileWidth)
                    mapTiles.create(x, y, 'grass');

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
        //if the player is currently alive

        if (player.stats.currentHealth > 0)
        {
            var delta = 200;
            //reset velocity
            player.sprite.body.velocity.setTo(0,0);
            //handle left movement
            if (cursors.left.isDown)
                player.sprite.body.velocity.x = -delta;
            //handle right movement
            else if (cursors.right.isDown)
                player.sprite.body.velocity.x = delta;
            else if (cursors.up.isDown)
                player.sprite.body.velocity.y = -delta;
            else if (cursors.down.isDown)
                player.sprite.body.velocity.y = delta;
            if (player.sprite.body.velocity.x != 0 || player.sprite.body.velocity.y != 0) {
                //clone player object but omit phaser sprite
                var clone = omit(player, 'sprite');
                clone.position = player.sprite.position;
                socket.emit('player moved', {position: clone.position, username: clone.username});
            }
        }
        //handles new players on map
        socket.on('new player', function (msg){
            msg = (JSON.stringify(msg).replace(/\\|"\"|\[`"]\\+ /g, '')).replace("\"", "").replace("\"", "");
            console.log("I am: "+player.username);
            if (player.username != msg) {
                var alreadyAdded = false;
                players.forEach(function(item) {
                    if (item.username === msg)
                        alreadyAdded = true;
                }, this);
                if (!alreadyAdded)
                {
                    console.log('new player: '+msg);
                    var newPlayer = players.create(game.width/2, game.height/2, 'rouge');
                    newPlayer.scale.setTo(0.15,0.15);
                    newPlayer.anchor.setTo(0.5,0.5);
                    newPlayer.username = msg;
                }
            }
            else
                console.log('its me!');
        });

        socket.on('player moved', function(msg){
            msgUsername = (JSON.stringify(JSON.parse(msg).username).replace(/\\|"\"|\[`"]\\+ /g, '')).replace("\"", "").replace("\"", "");
            console.log("Player moved: "+JSON.stringify(msgUsername));
            players.forEach(function(item){
               if(item.username === msgUsername)
                   item.position = JSON.parse(msg).position;
            });
        });
    }
};