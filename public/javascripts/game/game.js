var game = new Phaser.Game('100%', '100%', Phaser.AUTO, 'game-container');
//add the game states
game.state.add('boot', boot);
game.state.add('preload',preload);
game.state.add('characterCreate', characterCreate);
game.state.add('map', map);
var player = {};
var players;
var classes;
var socket = io();

var ignite = angular.module('ignite',[]);

//angularjs controller
ignite.controller('ignite-controller', function($scope, $http){

});

//dynamically prevent default form action on submit when login form is included
ignite.run(function($rootScope, $http){
    $rootScope.$on("$includeContentLoaded", function(event, templateName){
        $('form#login').submit(function () {
            var data=$('form#login').serialize();
            $.ajax({url: '/accounts/login', type: 'POST', async: false, data: data, success: function(doc) {
                startGame($http);
            }});
            $("div#login").removeClass("show");
            $("div#chat").addClass("show");
            $("div#stats").addClass("show");
            return false;
        });
    });
    //if game has already been started
    if (!$("div#login").hasClass("show")) {
        startGame($http);
    }
});

function startGame($http) {
    $http.get("/api/players/data").then(function(res){
        player = res.data;
        //add create sprite function
        player.createSprite = function(state, sprite) {
            //create/add player sprite to state
            sprite.sprite = state.add.sprite(game.width / 2, game.height / 2, 'rouge');
            var playerImage = game.cache.getImage(sprite);
            //create/add player label/name to state
            sprite.label = state.add.text(sprite.sprite.position.x, sprite.sprite.position.y - playerImage.height, sprite.username, {
                font: '24px Arial',
                fill: '#222'
            });
            sprite.label.anchor.setTo(0.5, 0.5);
            //anchor player to middle
            sprite.sprite.anchor.setTo(0.5, 0.5);
            //enable arcade physics
            //state.physics.enable(player.sprite, Phaser.Physics.ARCADE);
            state.physics.p2.enable(sprite.sprite);
            sprite.sprite.scale.setTo(0.15, 0.15);
            sprite.sprite.body.fixedRotation = true;
            game.camera.follow(sprite.sprite, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
        }
        game.state.start('map');
    });
}

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
    //handle chat messages
    $('form').submit(function() {
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