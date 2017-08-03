var game = new Phaser.Game('100%', '100%', Phaser.AUTO, 'game-container');
var player = {};
var players;
var classes;
var socket = io();
var oldPos;

$.ajax({url: '/api/players/data',async: false, success: function(doc) {
    log('player',JSON.stringify(doc));
    player = doc;
    //add create sprite function
    player.createSprite = function(state, sprite){
        //create/add player sprite to state
        sprite.sprite = state.add.sprite(game.width/2, game.height/2, 'rouge');
        var playerImage = game.cache.getImage(sprite);
        //create/add player label/name to state
        sprite.label = state.add.text(sprite.sprite.position.x, sprite.sprite.position.y - playerImage.height, sprite.username, { font: '24px Arial', fill: '#222' });
        sprite.label.anchor.setTo(0.5,0.5);
        //anchor player to middle
        sprite.sprite.anchor.setTo(0.5, 0.5);
        //enable arcade physics
        //state.physics.enable(player.sprite, Phaser.Physics.ARCADE);
        state.physics.p2.enable(sprite.sprite);
        sprite.sprite.scale.setTo(0.15, 0.15);
        sprite.sprite.body.fixedRotation = true;
        game.camera.follow(sprite.sprite, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
    }
}});

var ignite = angular.module('ignite',[]);
//angularjs controller
ignite.controller('ignite-controller', function($scope, $http){
    $http.get("/api/players/data").then(function(res){
        $scope.player = res.data;
        console.log($scope.player);
    });
});

$(window).resize(function() { window.resizeGame(); } );

function resizeGame() {var height = $(window).height();var width = $(window).width();	game.width = width;game.height = height;game.stage.bounds.width = width;game.stage.bounds.height = height;	if (game.renderType === Phaser.WEBGL){	game.renderer.resize(width, height);}}

$.ajax({
    url: '/api/classes/data',
    type: 'GET',
    success: function (doc)
    {
        log('classes', JSON.stringify(doc));
        classes = doc;
    }
});

$(document).ready(function () {
    $('form').submit(function() {
        if ($('#m').val().length > 0) {
            socket.emit('message', {sender: player.username, text: $('#m').val()});
            //reset val
            $('#m').val('');
        }
        return false;
    });

    var results = document.querySelectorAll('input[type="text"]');
    for (var i = 0; i < results.length; i++) {
        results[i].addEventListener("focus", setFocused);
        results[i].addEventListener("blur", removeFocused);
    }

    function setFocused() {
        var results = document.querySelectorAll('.game-panel');
        for (var i  = 0; i < results.length; i++) {
            results[i].classList.add('focus');
        }
    }
    function removeFocused() {
        var results = document.querySelectorAll('.game-panel');
        for (var i  = 0; i < results.length; i++) {
            results[i].classList.remove('focus');
        }
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