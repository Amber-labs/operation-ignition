/**
 * Created by laban on 2017-05-16.
 */
var socket = io();
var weapon;
var socketID;

socket.on('connected', function(id){
    socketID = id;
    console.log('id retrieved: '+id);
})

//handles messages sent
socket.on('message', function(msg){
    $('ul#messages').append(('<li><b>'+msg.sender+'</b>: '+msg.text)+'</li>')
});

//handles new players on map
socket.on('new player', function (newPlayer){
    addNewPlayer(newPlayer);
});

socket.on('new players', function (newPlayers){
   for (var i = 0; i < newPlayers.length; i++) {
       addNewPlayer(newPlayers[i]);
   }
});

socket.on('disconnected', function (id){
    console.log('player disconnected: '+id);
    removePlayer(id);
});

function addNewPlayer(newPlayer) {
    if (newPlayer.id != socketID) {
        var alreadyAdded = false;
        players.forEach(function (item) {
            if (item.id === newPlayer.id)
                alreadyAdded = true;
        }, this);
        if (!alreadyAdded) {
            console.log('new player: ' + newPlayer.username);
            const playerClass = 'rouge'
            var newPlayerSprite = players.create(game.width / 2, game.height / 2, playerClass);
            newPlayerSprite.scale.setTo(0.15, 0.15);
            newPlayerSprite.anchor.setTo(0.5, 0.5);
            newPlayerSprite.username = newPlayer.username;
            newPlayerSprite.displayLabel = game.add.text(newPlayerSprite.position.x, newPlayerSprite.position.y, newPlayerSprite.username);
            newPlayerSprite.displayLabel.anchor.setTo(0.5, 1);
            newPlayerSprite.id = newPlayer.id;
        }
    }
    socket.emit('old player', player.username)
}

function removePlayer(removedPlayer) {
    players.forEach(function(player){
       if(player.id === removedPlayer) {
           player.displayLabel.destroy();
           players.remove(player);
           $("ul#messages").append("<li><b>"+player.username+"</b> has disconnected</li>");
       }
    });
}

//handles movements from other players/browsers
socket.on('player moved', function(msg){
    var mover = msg;
    players.forEach(function(player){
        if(player.id === mover.id) {
            player.position = mover.position;
            player.displayLabel.position = mover.position;
        }
    });
});

var map = {
    width: 1920,
    height: 1920,
    preload: function () {
        log('state','map')
        //load the icons for setting, store, instructions, health, mana, coins
        this.load.image('grass','/images/tiles/grass_placeholder.png');
        this.load.image('tile','/images/tiles/tile_placeholder.png');
        this.load.image('red-bullet', '/images/weapons/red-bullet.png');
        this.load.image('rouge', '/images//player/characters/rouge.png');
        this.load.tilemap('spawn', '/map/spawn.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('tiles', '/tilesets/super_mario.png');
        this.load.image('Walls_tiles', '/tilesets/Walls.jpg');
        this.load.image('buildings_tiles', '/tilesets/tileset.png');
    },
    create: function () {
        socket.emit('new player', player.username);
        //this.physics.startSystem(Phaser.Physics.ARCADE);
        this.world.setBounds(0, 0, this.width, this.height);
        this.physics.startSystem(Phaser.Physics.P2JS);

        var map = game.add.tilemap('spawn');

        map.addTilesetImage('buildings', 'buildings_tiles');

        var layer = map.createLayer('background');
        var roads = map.createLayer('roads');
        var plants = map.createLayer('plants');
        var water = map.createLayer('water');
        var buildings = map.createLayer('buildings');

        layer.resizeWorld();

        //set the cursors to the users keyboard
        cursors = game.input.keyboard.createCursorKeys();
        player.createSprite(this, player);
        game.physics.p2.enable(player.sprite);
        //this.physics.enable(player.sprite, Phaser.Physics.ARCADE);
        //contains the maps tiles/sprites
        players = game.add.group();

        //  Creates 10 bullets, using the 'bullet' graphic
        weapon = game.add.weapon(30, 'red-bullet');

        //  The bullet will be automatically killed when it leaves the world bounds
        weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;

        //  Because our bullet is drawn facing up, we need to offset its rotation:
        weapon.bulletAngleOffset = 90;

        //  The speed at which the bullet is fired
        weapon.bulletSpeed = 400;

        //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
        weapon.fireRate = 60;

        //  Add a variance to the bullet angle by +- this value
        weapon.bulletAngleVariance = 10;

        //  Tell the Weapon to track the 'player' Sprite, offset by 14px horizontally, 0 vertically
        weapon.trackSprite(player.sprite, 14, 0);
    },
    update: function() {
        updatePlayer();
        if (this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR).isDown)
        {
            weapon.fire();
        }
    },
    render : function(){
        //game.debug.cameraInfo(this.camera, 32, 32);
        //game.debug.spriteCoords(player.sprite, 32, 500);
    }
};

function updatePlayer(){
    //if the player is currently alive
    if (player.stats.currentHealth > 0)
    {
        var delta = 200;
        player.sprite.body.setZeroVelocity();
        //handle left movement
        if (cursors.left.isDown)
        {
            player.sprite.body.moveLeft(delta);
            //flip sprite to face walking direction
            if (player.sprite.scale.x > 0)
                player.sprite.scale.x = -player.sprite.scale.x;
        }
        //handle right movement
        else if (cursors.right.isDown)
        {
            player.sprite.body.moveRight(delta);
            //flip sprite to face walking direction
            if (player.sprite.scale.x < 0)
                player.sprite.scale.x = -player.sprite.scale.x;
        }
        //handle upwards movement
        else if (cursors.up.isDown)
            player.sprite.body.moveUp(delta);
        //handle downwards movement
        else if (cursors.down.isDown)
            player.sprite.body.moveDown(delta);
        //precede if there is movement
        if (player.sprite.body.velocity.x != 0 || player.sprite.body.velocity.y != 0) {

            var pos = player.sprite.position;
            //update player label
            player.label.position = pos;
            player.label.anchor.setTo(0.5, 1);
            socket.emit('player moved', {position: player.sprite.position, username: player.username});
        }
    }
}

// chat functionality
$(document).ready(function () {
    //handle chat messages
    $('form#chatbox').submit(function() {
        if ($('#m').val().length > 0) {
            socket.emit('message', {sender: player.username, text: $('#m').val()});
            //reset val
            $('#m').val('');
        }
        return false;
    });

    //chat box focus select
    var results = document.querySelectorAll('input[type="text"]');
    for (var i = 0; i < results.length; i++) {
        results[i].addEventListener("focus", setFocused);
        results[i].addEventListener("blur", removeFocused);
    }

    //focus chatbox
    function setFocused() {
        var results = document.querySelectorAll('.game-panel');
        for (var i  = 0; i < results.length; i++) {
            results[i].classList.add('focus');
        }
    }

    //unfocus chatbox
    function removeFocused() {
        var results = document.querySelectorAll('.game-panel');
        for (var i  = 0; i < results.length; i++) {
            results[i].classList.remove('focus');
        }
    }
});