var characterCreate = {
    preload: function(){
        log('characterCreate','entered state');
        this.load.image('okay','/images/buttons/okay.png');
    },
    buttons : {},
    create: function() {
        buttons = game.add.group();
        var okayButton = game.make.button(game.world.centerX - 50 , game.world.centerY - 25, 'okay', submitCharacter, this, 2, 1, 0);
        buttons.add(okayButton);

        //  You can either set the tab size in the style object:
        var style = { font: "20px Courier", fill: "#fff", tabs: 132 };
        var text = 'Welcome: '+player.username+"!\t" +
            "Level: "+player.level+
            "";
        var displayText = game.add.text(100, 64, text, style);

        function submitCharacter()
        {
            console.log(player);
            this.state.start('map');
            $.ajax(
                {
                    url: '/api/players/data',
                    type: 'POST',
                    data: player,
                    success: function(result)
                    {
                        log('submitCharacter',JSON.stringify(result));
                    }
                }
            );
            alert('Submited');
        }


        //design the character create screen
        var graphics = game.add.graphics(20,20);

        // set a fill and line style
        graphics.beginFill(0x2f323a, 0.6);
        graphics.lineStyle(3, 0x2f323a, 1);

        // background shape
        graphics.lineTo(game.width - 40, 0);
        graphics.lineTo(game.width - 40, game.height - 40);
        graphics.lineTo(0, game.height - 40);
        graphics.endFill();

        // set a fill and line style again
        graphics.lineStyle(5, 0xfdfffc, 0.8);
        graphics.beginFill(0xfdfffc, 0.6);

        // draw class selection
        graphics.moveTo(25,25);
        graphics.lineTo(450,25);
        graphics.lineTo(450,game.height - 65);
        graphics.lineTo(25,game.height - 65);
        graphics.endFill();

        // draw a rectangle for character create
        graphics.lineStyle(2, 0x0000FF, 1);
        graphics.drawRect(500, 25, 300, game.height - 90);

        graphics.lineStyle(2, 0xde3c4b, 1);
        graphics.beginFill(0xde3c4b, 0.6);
        graphics.moveTo(850,27);
        graphics.lineTo(850,73);
        graphics.lineTo(835,50);

        graphics.lineStyle(2, 0xa2a79b, 1);
        graphics.beginFill(0xa2a79b, 0.6);
        graphics.drawRect(860, 25, 300, 50);
        graphics.drawRect(860, 95, 300, 50);
        graphics.drawRect(860, 165, 300, 50);
        graphics.drawRect(860, 235, 300, 50);


        window.graphics = graphics;
    },
    update : function() {

    },
}