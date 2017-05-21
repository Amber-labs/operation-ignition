var characterCreate = {
    preload: function(){
        log('characterCreate','entered state');
        this.load.image('okay','/images/buttons/okay.png');
    },
    buttons : {},
    create: function() {
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

        //------------------------class ----------------------
        // set a fill and line style again
        graphics.lineStyle(5, 0xA2A79E, 0.8);
        graphics.beginFill(0xA2A79E, 0.6);

        // draw class selection
        graphics.moveTo(25,25);
        graphics.lineTo(450,25);
        graphics.lineTo(450,game.height - 65);
        graphics.lineTo(25,game.height - 65);
        graphics.endFill();

        graphics.lineStyle(3, 0xEFF1ED, 0.7);
        graphics.beginFill(0xEFF1ED, 0.6);

        // draw class selection
        graphics.moveTo(50,50);
        graphics.lineTo(425,50);
        graphics.lineTo(425,200);
        graphics.lineTo(50,200);
        graphics.endFill();

        arrowGenerator(300, 48, "l" );
        arrowGenerator(300, 428, "r" );

        // draw a rectangle for character create
        graphics.lineStyle(2, 0x0000FF, 1);
        graphics.drawRect(500, 25, 300, game.height - 90);


        function arrowGenerator(cord, x, side)
        {
            graphics.lineStyle(2, 0xde3c4b, 1);
            graphics.beginFill(0xde3c4b, 0.6);

            var point1 = cord + 2;
            var point2 = cord + 50;
            var point3 = cord + 25;
            if (side == "l")
            {
                graphics.moveTo(x,point1);
                graphics.lineTo(x,point2);
                graphics.lineTo(x-15,point3);
            }
            else{
                graphics.moveTo(x,point1);
                graphics.lineTo(x,point2);
                graphics.lineTo(x+15,point3);
            }
            graphics.endFill();
        }

        arrowGenerator(25, 860, "l" );
        arrowGenerator(95, 860,"l"  );
        arrowGenerator(165, 860 ,"l" );
        arrowGenerator(235, 860 ,"l" );

        arrowGenerator(25, 1180 , "r");
        arrowGenerator(95, 1180 , "r");
        arrowGenerator(165, 1180 , "r");
        arrowGenerator(235, 1180 , "r");

        graphics.lineStyle(2, 0xa2a79b, 1);
        graphics.beginFill(0xa2a79b, 0.6);
        graphics.drawRect(870, 25, 300, 50);
        graphics.drawRect(870, 95, 300, 50);
        graphics.drawRect(870, 165, 300, 50);
        graphics.drawRect(870, 235, 300, 50);


        window.graphics = graphics;

        buttons = game.add.group();
        var okayButton = game.make.button(game.width - 150 , game.height - 100, 'okay', submitCharacter, this, 2, 1, 0);
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



    },
    update : function() {

    },
}