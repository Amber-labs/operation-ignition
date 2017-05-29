var classSpec;
var hair, eyes, face, weapons;
var style = { font: "30pt Courier", fill: "#ffffff", stroke: "#ffffff", strokeThickness: 2 , boundsAlignH: "center", boundsAlignV: "middle" };//{ font: "20px Courier", fill: "#fff", tabs: 132 };

var characterCreate = {
    preload: function(){
        log('characterCreate','entered state');
        this.load.image('okay','/images/buttons/okay.png');
    },
    buttons : {},
    create: function() {
        //design the character create screen
        var graphics = game.add.graphics(20,20);

        /*
        // set a fill and line style
        graphics.beginFill(0x2f323a, 0.6);
        graphics.lineStyle(3, 0x2f323a, 1);

        // background shape
        graphics.lineTo(game.width - 40, 0);
        graphics.lineTo(game.width - 40, game.height - 40);
        graphics.lineTo(0, game.height - 40);
        graphics.endFill();
        */
        //------------------------class ----------------------
        // set a fill and line style again
        graphics.lineStyle(3, 0xEFF1ED, 0.5);
        graphics.beginFill(0xA2A79E, 0.0);

        // draw class selection
        graphics.moveTo(15,105);
        graphics.lineTo(400,105);
        graphics.lineTo(400,game.height - 65);
        graphics.lineTo(25,game.height - 65);
        graphics.endFill();

        graphics.lineStyle(3, 0xEFF1ED, 0.5);
        graphics.beginFill(0xEFF1ED, 0.0);
        // draw class selection
        graphics.moveTo(15,15);
        graphics.lineTo(400,15);
        graphics.lineTo(400,100);
        graphics.lineTo(15,100);
        graphics.endFill();
        //add the class and keeps it in the center as well
        classSpec = game.add.text(20, 20, classes.classes[0], style);
        classSpec.setTextBounds(15, 15, 400, 85);
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
        rarrow.moveTo(400,point1);
        rarrow.lineTo(400,point2);
        rarrow.lineTo(400+15,point3);
        rarrow.inputEnabled = true;
        rarrow.events.onInputDown.add(nextClass, this);

        rarrow.events.onInputOver.add(nextClassOver, this);
        rarrow.events.onInputOut.add(nextClassOut, this);
        rarrow.endFill();


       // arrowGenerator(300,48, "l" );
       // arrowGenerator(300, 428, "r" );

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
        /*
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
        //add the class and keeps it in the center as well
        hair = game.add.text(20, 20, "Hair" , { font: "30pt Courier", fill: "#ffffff", stroke: "#ffffff", strokeThickness: 2 , boundsAlignH: "center", boundsAlignV: "middle" });
        hair.setTextBounds(870, 25, 300, 50);

        graphics.drawRect(870, 95, 300, 50);
        hair = game.add.text(20, 20, "Eyes" , { font: "30pt Courier", fill: "#ffffff", stroke: "#ffffff", strokeThickness: 2 , boundsAlignH: "center", boundsAlignV: "middle" });
        hair.setTextBounds(870, 95, 300, 50);

        graphics.drawRect(870, 165, 300, 50);
        hair = game.add.text(20, 20, "Face" , { font: "30pt Courier", fill: "#ffffff", stroke: "#ffffff", strokeThickness: 2 , boundsAlignH: "center", boundsAlignV: "middle" });
        hair.setTextBounds(870, 165, 300, 50);

        graphics.drawRect(870, 235, 300, 50);
        hair = game.add.text(20, 20, "Weapons" , { font: "30pt Courier", fill: "#ffffff", stroke: "#ffffff", strokeThickness: 2 , boundsAlignH: "center", boundsAlignV: "middle" });
        hair.setTextBounds(870, 235, 300, 50);
        */
        //Test something to see if this idea will work

        hairTab();
        eyeTab();
        faceTab();
        weaponTab();
        TabText();

        /*
        graphics.beginFill(0xDEB887);
        graphics.lineStyle(3, 0xF4A460, 1);
        graphics.drawRect(855, 370, 50, 50);
        */
        window.graphics = graphics;

        buttons = game.add.group();
        var okayButton = game.make.button(game.width - 150 , game.height - 100, 'okay', submitCharacter, this, 2, 1, 0);
        buttons.add(okayButton);

        //  You can either set the tab size in the style object:
        //var text = 'Welcome: '+player.username+"!\t" +
         //   "Level: "+player.level+
          //  "";
        // var displayText = game.add.text(100, 64, text, style);

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
function TabText()
{
    hair = game.add.text(20, 20, "Hair" ,{ font: "16pt Courier", fill: "#ffffff", stroke: "#ffffff", strokeThickness: 1 , boundsAlignH: "center", boundsAlignV: "middle" } );
    hair.setTextBounds(800, 17, 110, 40);
    hair.inputEnabled = true;
    hair.events.onInputOver.add(hairOver,this);
    hair.events.onInputOut.add(hairOut,this);
    hair.events.onInputDown.add(hairDown,this);

    eyes = game.add.text(20, 20, "Eyes" , { font: "16pt Courier", fill: "#ffffff", stroke: "#ffffff", strokeThickness: 1 , boundsAlignH: "center", boundsAlignV: "middle" });
    eyes.setTextBounds(900, 17, 110, 40);
    eyes.events.onInputOver.add(eyesOver,this);
    eyes.events.onInputOut.add(eyesOut,this);
    eyes.events.onInputDown.add(eyesDown,this);

    face = game.add.text(20, 20, "Face" , { font: "16pt Courier", fill: "#ffffff", stroke: "#ffffff", strokeThickness: 1 , boundsAlignH: "center", boundsAlignV: "middle" });
    face.setTextBounds(1000, 17, 110, 40);
    face.events.onInputOver.add(faceOver,this);
    face.events.onInputOut.add(faceOut,this);
    face.events.onInputDown.add(faceDown,this);

    weapon = game.add.text(20, 20, "Weapon" , { font: "16pt Courier", fill: "#ffffff", stroke: "#ffffff", strokeThickness: 1 , boundsAlignH: "center", boundsAlignV: "middle" });
    weapon.setTextBounds(1100, 17, 110, 40);
    weapon.events.onInputOver.add(weaponOver,this);
    weapon.events.onInputOut.add(weaponOut,this);
    weapon.events.onInputDown.add(weaponDown,this);
}
function hairTab()
{
    var hairTAB = game.add.graphics(20,20);
    // Hair Tab
    hairTAB.beginFill(0xDE3C4B);
    hairTAB.lineStyle(3, 0x9b2a34, 1);
    hairTAB.moveTo(800,55);
    hairTAB.lineTo(810, 15);
    hairTAB.lineTo(900, 15);
    hairTAB.lineTo(910, 55);
    // graphics.lineTo(1010, 55);
    hairTAB.lineTo(game.width-65, 55);
    hairTAB.lineTo(game.width-65, game.height - 65);
    hairTAB.lineTo(800, game.height - 65);
    hairTAB.endFill();
}
function eyeTab()
{
    var eyeTAB = game.add.graphics(20,20);
    // Eyes tab
    eyeTAB.beginFill(0xFB651D);
    eyeTAB.lineStyle(3, 0xaf4614, 1);
    eyeTAB.moveTo(800,55);
    eyeTAB.lineTo(900, 55);
    eyeTAB.lineTo(910, 15);
    eyeTAB.lineTo(1000, 15);
    eyeTAB.lineTo(1010, 55);
    eyeTAB.lineTo(game.width-65, 55);
    eyeTAB.lineTo(game.width-65, game.height - 65);
    eyeTAB.lineTo(800, game.height - 65);
    eyeTAB.endFill();
}
function faceTab()
{
    var faceTAB = game.add.graphics(20,20);
    // Face tab
    faceTAB.beginFill(0x2F323A);
    faceTAB.lineStyle(3, 0x202328, 1);
    faceTAB.moveTo(800,55);
    faceTAB.lineTo(1000, 55);
    faceTAB.lineTo(1010, 15);
    faceTAB.lineTo(1100, 15);
    faceTAB.lineTo(1110, 55);
    faceTAB.lineTo(game.width-65, 55);
    faceTAB.lineTo(game.width-65, game.height - 65);
    faceTAB.lineTo(800, game.height - 65);
    faceTAB.endFill();
}
function weaponTab()
{
    var weaponTAB = game.add.graphics(20,20);
    // Weapon tab
    weaponTAB.beginFill(0xA2A79E);
    weaponTAB.lineStyle(3, 0x71746e, 1);
    weaponTAB.moveTo(800,55);
    weaponTAB.lineTo(1100, 55);
    weaponTAB.lineTo(1110, 15);
    weaponTAB.lineTo(1200, 15);
    weaponTAB.lineTo(1210, 55);
    weaponTAB.lineTo(game.width-65, 55);
    weaponTAB.lineTo(game.width-65, game.height - 65);
    weaponTAB.lineTo(800, game.height - 65);
    weaponTAB.endFill();
}

function preClass() {
    console.log("in pre class ");
    classSpec.destroy();
    classIndex--;
    if (classIndex > 0 )
    {
        classSpec = game.add.text(20, 20, classes.classes[classIndex], style);
        classSpec.setTextBounds(15, 15, 400, 85);
    }
    else if (classIndex <= 0)
    {
        classIndex = 0;
        classSpec = game.add.text(20, 20, classes.classes[classIndex], style);
        classSpec.setTextBounds(15, 15, 400, 85);
    }
}
function nextClass() {
    console.log("in next class ");
    classSpec.destroy();
    classIndex++;

    console.log( classes.classes.length + " Length on the class");

    if (classIndex < classes.classes.length )
    {
        classSpec = game.add.text(20, 20, classes.classes[classIndex], style);
        classSpec.setTextBounds(15, 15, 400, 85);
    }
    else if (classIndex >= classes.classes.length)
    {
        classSpec = game.add.text(20, 20, classes.classes[classes.classes.length-1], style);
        classSpec.setTextBounds(15, 15, 400, 85);
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
    over(320,400,"r");
}
function preClassOver() {
    over(320,68,"l");

}
function nextClassOut() {
    out(320,400,"r");
}
function preClassOut() {
    out(320,68,"l");

}
function hairOver()
{

}
function hairOut()
{

}
function hairDown()
{
    console.log("hair");
    eyeTab(); faceTab(); weaponTab(); hairTab(); TabText();
}
function eyesOver()
{

}
function eyesOut()
{

}
function eyesDown()
{
    console.log("eyes");
    hairTab();  faceTab(); weaponTab(); eyeTab(); TabText();
}
function faceOver()
{

}
function faceOut()
{

}
function faceDown()
{
    console.log("face");
    hairTab(); eyeTab();  weaponTab();  faceTab(); TabText();
}
function weaponOver()
{

}
function weaponOut()
{

}
function weaponDown()
{
    console.log("weapon");
    hairTab(); eyeTab();  faceTab(); weaponTab(); TabText();
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