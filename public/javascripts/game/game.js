var game = new Phaser.Game('100%', '100%', Phaser.AUTO, 'game-container');
var player = {};
var players;
var classes;
var gameStart = false;

//add the game states
game.state.add('boot', boot);
game.state.add('preload',preload);
game.state.add('characterCreate', characterCreate);
game.state.add('map', map);

var ignite = angular.module('ignite',[]);

//angularjs controller
ignite.controller('ignite-controller', function($scope, $http){

});

//game startup
ignite.run(function($rootScope, $http) {
    //if the user has already been logged in
    if (!$("div#login").hasClass("show")) {
        startGameLogin($http);
    }
    else {
        $rootScope.$on("$includeContentLoaded", function(event, templateName){
            //if user is trying to login
            $('form#login').submit(function () {
                var data=$('form#login').serialize();
                $.ajax({url: '/accounts/login', type: 'POST', async: false, data: data, success: function(doc) {
                    startGameLogin($http);
                }});
                return false;
            });
            //if user is using a guest account
            $('form#guest').submit(function() {
                startGameGuest();
                return false;
            });
        });
    }
});

//initiate starting game view
function startGameLogin($http) {
    //collect users login data
    $http.get("/api/players/data").then(function(res){
        player = res.data;
        //attach create sprite function
        startGame();
    });
}

//starts the game as a guest account
function startGameGuest() {
    player = {
        username: $('form#guest').find('input[name="username"]').val() ||'Guest',
        created:true,
        level:92,
        experience:2190491,
        class:"",
        specialization:"sniper",
        inventory:["potion","potion","potion"],
        stats:{
            "currentHealth":1234,
            "mana":1234,
            "maxHealth":99203148,
            "attack":32190123,"buff":43436,
            "condition":342324,
            "defence":321320123,
            "healing":124,
            "precision":3128093209,
            "specialAttack":32192317,
            "specialDefence":213080213,
            "stamina":3218973
        }
    }
    startGame();
}

//general start game method
function startGame() {
    log('player', JSON.stringify(player));
    player.createSprite = function(state, sprite) {
        //create/add player sprite to state
        sprite.sprite = state.add.sprite(game.width / 2, game.height / 2, 'rouge');
        var playerImage = game.cache.getImage(sprite);
        //create/add player label/name to state
        sprite.label = state.add.text(sprite.sprite.position.x, sprite.sprite.position.y - playerImage.height, sprite.username, {
            font: '24px Arial'
        });
        sprite.label.anchor.setTo(0.5, 0.5);
        //anchor player to middle
        sprite.sprite.anchor.setTo(0.5, 0.5);
        map.physics.p2.enable(sprite.sprite);
        sprite.sprite.scale.setTo(0.15, 0.15);
        sprite.sprite.body.fixedRotation = true;
        game.camera.follow(sprite.sprite, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
    }
    $("div#login").removeClass("show");
    $("div#chat").addClass("show");
    $("div#stats").addClass("show");
    addPlayer();
    socket.emit('new player', player.username);
    gameStart = true;
}

$(window).resize(function() { window.resizeGame(); } );
function resizeGame() {
    var height = $(window).height();
    var width = $(window).width();
    game.width = width;game.height = height;
    game.stage.bounds.width = width;game.stage.bounds.height = height;
    if (game.renderType === Phaser.WEBGL){	game.renderer.resize(width, height);}
}

//get the list of server classes
$.ajax({
    url: '/api/classes/data',
    type: 'GET',
    success: function (doc)
    {
        log('classes', JSON.stringify(doc));
        classes = doc;
    }
});

game.state.start('map');