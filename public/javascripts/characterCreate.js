var characterCreate = {
    preload: function(){
        log('characterCreate','entered state');
        this.load.image('okay','/images/buttons/okay.png');
        $.ajax({
            url: '/api/classes/data',
            type: 'GET',
            success: function (result)
            {
                log('getClasses', JSON.stringify(result));
            }
        })
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
    },
    update : function() {

    },
}