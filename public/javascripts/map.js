/**
 * Created by laban on 2017-05-16.
 */
var map = {
    width: 1920,
    height: 1920,
    preload: function () {
        log('state','map')
        //load the icons for setting, store, instructions, health, mana, coins
        this.load.image('grass','/images/tiles/grass_placeholder.png');
        this.load.image('tile','/images/tiles/tile_placeholder.png');
        this.load.image('rouge', '/images//player/characters/rouge.png');
        this.load.tilemap('spawn', '/map/spawn.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('mario', '/map/super_mario.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('temp', '/map/temp.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('tiles', '/tilesets/super_mario.png');
        this.load.image('Walls_tiles', '/tilesets/Walls.jpg');
        this.load.image('buildings_tiles', '/tilesets/tileset.png');
    },
    create: function () {
        socket.emit('new player', player.username);
        //this.physics.startSystem(Phaser.Physics.ARCADE);
        this.world.setBounds(0, 0, this.width, this.height);
        this.physics.startSystem(Phaser.Physics.P2JS);

        //contains the maps tiles/sprites
        var mapTiles = this.add.group();
        players = game.add.group();

        //hard coded tile dimensions
        var tileHeight = 20;
        var tileWidth = 20;
        /*
        for (var y = 0; y < this.height; y += tileHeight)
            for (var x = 0; x < this.width; x += tileWidth) {
                if (x % 300 == 0 || y % 300 == 0 || x % this.width == 0 || y % this.width == 0)
                    mapTiles.create(x, y, 'tile');
                else
                    mapTiles.create(x,y, 'grass');
            }
        */

        /*
        var map = game.add.tilemap('spawn');
        map.addTilesetImage('Walls', 'Walls_tiles');
        map.addTilesetImage('Walls', 'Walls_tiles');
        map.addTilesetImage('buildings', 'buildings_tiles');

        var layer = map.createLayer('plants');
        layer.resizeWorld();
        var layer2 = map.createLayer('buildings');
        layer2.resizeWorld();
        var layer3 = map.createLayer('roads');
        layer3.resizeWorld();
        var layer4 = map.createLayer('background');
        layer4.resizeWorld();
        //var layer5 = map.createLayer('player');
        //layer5.resizeWorld();
        */


        var map = game.add.tilemap('temp');

        map.addTilesetImage('buildings', 'buildings_tiles');

        var layer = map.createLayer('background');
        var roads = map.createLayer('roads');
        var buildings = map.createLayer('buildings');

        layer.resizeWorld();


        //set the cursors to the users keyboard
        cursors = game.input.keyboard.createCursorKeys();
        player.createSprite(this, player);
    },
    update: function() {
        updatePlayer();
        //handles new players on map
        socket.on('new player', function (msg){
            msg = (JSON.stringify(msg).replace(/\\|"\"|\[`"]\\+ /g, '')).replace("\"", "").replace("\"", "");
            if (msg != player.username) {
                var alreadyAdded = false;
                players.forEach(function (item) {
                    if (item.username === msg)
                        alreadyAdded = true;
                }, this);
                if (!alreadyAdded) {
                    console.log('new player: ' + msg);
                    var newPlayer = players.create(game.width / 2, game.height / 2, 'rouge');
                    newPlayer.scale.setTo(0.15, 0.15);
                    newPlayer.anchor.setTo(0.5, 0.5);
                    newPlayer.username = msg;
                    newPlayer.displayLabel = game.add.text(newPlayer.position.x, newPlayer.position.y, msg);
                    newPlayer.displayLabel.anchor.setTo(0.5, 1);
                }
            }
        });

        socket.on('player moved', function(msg){
            msgUsername = (JSON.stringify(JSON.parse(msg).username).replace(/\\|"\"|\[`"]\\+ /g, '')).replace("\"", "").replace("\"", "");
            //console.log("Player moved: "+JSON.stringify(msgUsername));
            players.forEach(function(item){
               if(item.username === msgUsername) {
                   item.position = JSON.parse(msg).position;
                   item.displayLabel.position = JSON.parse(msg).position;
                   //item.anchor.setTo(0.5, 1);
               }
            });
        });

        function updatePlayer(){
            //if the player is currently alive
            if (player.stats.currentHealth > 0)
            {
                var delta = 200;
                //reset velocity
                //player.sprite.body.velocity.setTo(0,0);
                player.sprite.body.setZeroVelocity();
                //handle left movement
                if (cursors.left.isDown)
                    //player.sprite.body.velocity.x = -delta;
                    player.sprite.body.moveLeft(delta);
                //handle right movement
                else if (cursors.right.isDown)
                    //player.sprite.body.velocity.x = delta;
                    player.sprite.body.moveRight(delta);
                else if (cursors.up.isDown)
                    //player.sprite.body.velocity.y = -delta;
                    player.sprite.body.moveUp(delta);
                else if (cursors.down.isDown)
                    //player.sprite.body.velocity.y = delta;
                    player.sprite.body.moveDown(delta);
                if (player.sprite.body.velocity.x != 0 || player.sprite.body.velocity.y != 0) {
                    var pos = player.sprite.position;
                    if (typeof oldPos === 'undefined') {
                        console.log(JSON.stringify(pos));
                        oldPos = {
                            x: pos.x,
                            y: pos.y,
                            type: pos.type
                        };
                    }
                    //var playerImage = game.cache.getImage(player);
                    //pos.y = pos.y - playerImage.height;
                    //update player label
                    player.label.position = pos;
                    player.label.anchor.setTo(0.5, 1);
                    //clone player object but omit phaser sprite
                    var clone = omit(player, 'sprite');
                    clone.position = player.sprite.position;
                    if (Math.abs(pos.x-oldPos.x) > 6 || Math.abs(pos.y-oldPos.y) > 6) {
                        socket.emit('player moved', {position: clone.position, username: clone.username});
                        oldPos = {
                            x: pos.x,
                            y: pos.y,
                            type: pos.type
                        };
                    }
                }
            }
        }
    },
    render : function(){
        game.debug.cameraInfo(this.camera, 32, 32);
        game.debug.spriteCoords(player.sprite, 32, 500);
    }
};