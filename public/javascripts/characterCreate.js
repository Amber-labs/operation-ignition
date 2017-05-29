var classSpec;
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
        //add the class and keeps it in the center as well
        classSpec = game.add.text(0, 0, classes.classes[0], { font: "30pt Courier", fill: "#000000", stroke: "#000000", strokeThickness: 2 , boundsAlignH: "center", boundsAlignV: "middle" });
        classSpec.setTextBounds(50, 50, 425, 200);
        //adding action to the arrows
        var larrow = game.add.graphics(0,0);
        larrow.lineStyle(2, 0xde3c4b, 1);
        larrow.beginFill(0xde3c4b, 0.6);
        var point1 = 320 + 2;
        var point2 = 320 + 50;
        var point3 = 320 + 25;
        larrow.moveTo(68,point1);
        larrow.lineTo(68,point2);
        larrow.lineTo(68-15,point3);
        larrow.inputEnabled = true;
        larrow.events.onInputDown.add(preClass, this);

        larrow.events.onInputOver.add(preClassOver, this);
        larrow.events.onInputOut.add(preClassOut, this);
        larrow.endFill();
        var rarrow = game.add.graphics(0,0);
        rarrow.lineStyle(2, 0xde3c4b, 1);
        rarrow.beginFill(0xde3c4b, 0.6);
        rarrow.moveTo(448,point1);
        rarrow.lineTo(448,point2);
        rarrow.lineTo(448+15,point3);
        rarrow.inputEnabled = true;
        rarrow.events.onInputDown.add(nextClass, this);

        rarrow.events.onInputOver.add(nextClassOver, this);
        rarrow.events.onInputOut.add(nextClassOut, this);
        rarrow.endFill();


       // arrowGenerator(300,48, "l" );
       // arrowGenerator(300, 428, "r" );

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
};
var classIndex = 0;

function preClass() {
    console.log("in pre class ");
    classSpec.destroy();
    classIndex--;
    if (classIndex > 0 )
    {
        classSpec = game.add.text(0, 0, classes.classes[classIndex], { font: "30pt Courier", fill: "#000000", stroke: "#000000", strokeThickness: 2 , boundsAlignH: "center", boundsAlignV: "middle" });
        classSpec.setTextBounds(50, 50, 425, 200);
    }
    else if (classIndex <= 0)
    {
        classIndex = 0;
        classSpec = game.add.text(0, 0, classes.classes[classIndex], { font: "30pt Courier", fill: "#000000", stroke: "#000000", strokeThickness: 2 , boundsAlignH: "center", boundsAlignV: "middle" });
        classSpec.setTextBounds(50, 50, 425, 200);
    }
}
function nextClass() {
    console.log("in next class ");
    classSpec.destroy();
    classIndex++;

    console.log( classes.classes.length + " Length on the class");

    if (classIndex < classes.classes.length )
    {
        classSpec = game.add.text(0, 0, classes.classes[classIndex], { font: "30pt Courier", fill: "#000000", stroke: "#000000", strokeThickness: 2 , boundsAlignH: "center", boundsAlignV: "middle" });
        classSpec.setTextBounds(50, 50, 425, 200);
    }
    else if (classIndex >= classes.classes.length)
    {
        classSpec = game.add.text(0, 0, classes.classes[classes.classes.length-1], { font: "30pt Courier", fill: "#000000", stroke: "#000000", strokeThickness: 2 , boundsAlignH: "center", boundsAlignV: "middle" });
        classSpec.setTextBounds(50, 50, 425, 200);
        classIndex = classes.classes.length-1;
    }
}

function over(cord, x, side){
    var arrow = game.add.graphics(0,0);
    arrow.lineStyle(2, 0xFB651D, 1);
    arrow.beginFill(0xFB651D, 0.6);

    var point1 = 320 + 2;
    var point2 = 320 + 50;
    var point3 = 320 + 25;
    if (side == "l")
    {

        arrow.moveTo(68,point1);
        arrow.lineTo(68,point2);
        arrow.lineTo(68-15,point3);
    }else{
        arrow.moveTo(x,point1);
        arrow.lineTo(x,point2);
        arrow.lineTo(x+15,point3);
    }
    arrow.endFill();
}
function out(cord, x, side){
    var arrow = game.add.graphics(0,0);
    arrow.lineStyle(2, 0xde3c4b, 1);
    arrow.beginFill(0xde3c4b, 0.6);

    var point1 = 320 + 2;
    var point2 = 320 + 50;
    var point3 = 320 + 25;
    if (side == "l")
    {

        arrow.moveTo(68,point1);
        arrow.lineTo(68,point2);
        arrow.lineTo(68-15,point3);
    }else{
        arrow.moveTo(x,point1);
        arrow.lineTo(x,point2);
        arrow.lineTo(x+15,point3);
    }
    arrow.endFill();
}
function nextClassOver() {
    over(320,448,"r");
}
function preClassOver() {
    over(320,68,"l");

}
function nextClassOut() {
    out(320,448,"r");
}
function preClassOut() {
    out(320,68,"l");

}
var classes = {
    class: {
        soldier: {
            specialization: "Gaurdian",
            hp: 190,
            def: 200,
            sDef: 190,
            atk: 110,
            sAtk: 90,
            sta: 40,
            mna: 40,
            prc: 40,
            hea: 70,
            buf: 50,
            con: 80
        },
        Mercenary: {
            specialization: "Assassin",
            hp: 190,
            def: 200,
            sDef: 190,
            atk: 110,
            sAtk: 90,
            sta: 40,
            mna: 40,
            prc: 40,
            hea: 70,
            buf: 50,
            con: 80
        },
        BlackMage: {
            specialization: "Summoner",
            hp: 190,
            def: 200,
            sDef: 190,
            atk: 110,
            sAtk: 90,
            sta: 40,
            mna: 40,
            prc: 40,
            hea: 70,
            buf: 50,
            con: 80
        }
    }
};