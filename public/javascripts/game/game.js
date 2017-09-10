var ignite = angular.module('ignite', []);

//game startup
ignite.run(function($rootScope, $http) {
  //if the user has already been logged in
  if (!$("div#login").hasClass("show")) {
    setTimeout(function() {
      startGameLogin($http);
    }, 100);
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
        startGame();
        return false;
      });
    });
  }
});

var game = new Phaser.Game('100%', '100%', Phaser.AUTO, 'game-container');
var player = {};
var players;
var classes;
var gameStart = false;

//angularjs controller
ignite.controller('ignite-controller', function($scope, $http){

});

// Player constructor
function Player(id, username, sprite, equipment, job, stats) {
  this.id = id;
  this.username = username || 'Guest';
  this.sprite = sprite || '/images/Player/characters/mercenary.png';
  this.equipment = equipment || ["potion","potion","potion"];
  this.job = job || 'rouge'
  this.stats = stats || {
    "currentHealth":10,
    "mana":10,
    "maxHealth":10,
    "attack":10,
    "buff":10,
    "condition":10,
    "defence":10,
    "healing":10,
    "precision":10,
    "specialAttack":10,
    "specialDefence":10,
    "stamina":10
  }
}

// Attach method to player prototype for creating player Phaser sprite
Player.prototype.createSprite = function (state, sprite) {
  //create/add player sprite to state
  sprite.sprite = state.add.sprite(game.width / 2, game.height / 2, 'rouge');
  //anchor player to middle
  sprite.sprite.anchor.setTo(0.5, 0.5);
  state.physics.p2.enable(sprite.sprite);
  sprite.sprite.scale.setTo(0.15, 0.15);
  sprite.sprite.body.fixedRotation = true;
}

Player.prototype.createSpriteLabel = function (state, sprite) {
  var playerImage = game.cache.getImage(sprite);
  //create/add player label/name to state
  sprite.label = state.add.text(
    sprite.sprite.position.x,
    sprite.sprite.position.y - playerImage.height,
    sprite.username,
    {font: '24px Arial'}
  );
  sprite.label.anchor.setTo(0.5, 0.5);
}

//initiate starting game view
function startGameLogin($http) {
    //collect users login data
    $http.get("/api/players/data").then(function(res){
        player = res.data;
        //attach create sprite function
        startGame();
    });
}

//general start game method
function startGame() {
    log('player', JSON.stringify(player));
    //Create new player object
    player = new Player(0, player.username, player.icon, player.inventory, player.specialization, player.stats);
    player.createSprite(game, player);
    player.createSpriteLabel(game, player)
    $("div#login").removeClass("show");
    $("div#chat").addClass("show");
    $("div#stats").addClass("show");
    //addPlayer(map, player);
    socket.emit('new player', player.username);
    gameStart = true;
}

$(window).resize(function() { window.resizeGame(); } );

function resizeGame() {
    var height = $(window).height();
    var width = $(window).width();
    game.width = width;game.height = height;
    game.stage.bounds.width = width;
    game.stage.bounds.height = height;
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

//add the game states
game.state.add('boot', boot);
game.state.add('preload',preload);
game.state.add('characterCreate', characterCreate);
game.state.add('map', map);
game.state.start('map');