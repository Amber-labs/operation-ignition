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

        //Test something to see if this idea will work

        eyeTab();
        faceTab();
        weaponTab();
        hairTab();
        TabText();
        tabLayout();

        window.graphics = graphics;

        buttons = game.add.group();
        var okayButton = game.make.button(game.width/2 , game.height - 100, 'okay', submitCharacter, this, 2, 1, 0);
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
    eyes.inputEnabled = true;
    eyes.events.onInputOver.add(eyesOver,this);
    eyes.events.onInputOut.add(eyesOut,this);
    eyes.events.onInputDown.add(eyesDown,this);

    face = game.add.text(20, 20, "Face" , { font: "16pt Courier", fill: "#ffffff", stroke: "#ffffff", strokeThickness: 1 , boundsAlignH: "center", boundsAlignV: "middle" });
    face.setTextBounds(1000, 17, 110, 40);
    face.inputEnabled = true;
    face.events.onInputOver.add(faceOver,this);
    face.events.onInputOut.add(faceOut,this);
    face.events.onInputDown.add(faceDown,this);

    weapon = game.add.text(20, 20, "Weapon" , { font: "16pt Courier", fill: "#ffffff", stroke: "#ffffff", strokeThickness: 1 , boundsAlignH: "center", boundsAlignV: "middle" });
    weapon.setTextBounds(1100, 17, 110, 40);
    weapon.inputEnabled = true;
    weapon.events.onInputOver.add(weaponOver,this);
    weapon.events.onInputOut.add(weaponOut,this);
    weapon.events.onInputDown.add(weaponDown,this);
}
function tabLayout()
{
    var hairTAB = game.add.graphics(20,20);
    // Display box
    hairTAB.lineStyle(3, 0xffffff, 1);
    hairTAB.moveTo(810,75);
    hairTAB.lineTo(game.width-75, 75);
    hairTAB.lineTo(game.width-75, 220);
    hairTAB.lineTo(810, 220);
    hairTAB.lineTo(810, 75);
    // items

    hairTAB.moveTo(830,250);
    hairTAB.lineTo(930, 250);
    hairTAB.lineTo(930, 350);
    hairTAB.lineTo(830, 350);
    hairTAB.lineTo(830, 250);

    hairTAB.moveTo(950,250);
    hairTAB.lineTo(1050, 250);
    hairTAB.lineTo(1050, 350);
    hairTAB.lineTo(950, 350);
    hairTAB.lineTo(950, 250);

    hairTAB.moveTo(1070,250);
    hairTAB.lineTo(1170, 250);
    hairTAB.lineTo(1170, 350);
    hairTAB.lineTo(1070, 350);
    hairTAB.lineTo(1070, 250);

    hairTAB.moveTo(830,370);
    hairTAB.lineTo(930, 370);
    hairTAB.lineTo(930, 470);
    hairTAB.lineTo(830, 470);
    hairTAB.lineTo(830, 370);

    hairTAB.moveTo(950,370);
    hairTAB.lineTo(1050, 370);
    hairTAB.lineTo(1050, 470);
    hairTAB.lineTo(950, 470);
    hairTAB.lineTo(950, 370);

    hairTAB.moveTo(1070,370);
    hairTAB.lineTo(1170, 370);
    hairTAB.lineTo(1170, 470);
    hairTAB.lineTo(1070, 470);
    hairTAB.lineTo(1070, 370);

    hairTAB.moveTo(830,490);
    hairTAB.lineTo(930, 490);
    hairTAB.lineTo(930, 590);
    hairTAB.lineTo(830, 590);
    hairTAB.lineTo(830, 490);

    hairTAB.moveTo(950,490);
    hairTAB.lineTo(1050, 490);
    hairTAB.lineTo(1050, 590);
    hairTAB.lineTo(950, 590);
    hairTAB.lineTo(950, 490);

    hairTAB.moveTo(1070,490);
    hairTAB.lineTo(1170, 490);
    hairTAB.lineTo(1170, 590);
    hairTAB.lineTo(1070, 590);
    hairTAB.lineTo(1070, 490);
    hairTAB.endFill();
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
    hair.fill = "#000000";
    hair.stroke = "#000000";
}
function hairOut()
{
    hair.fill = "#ffffff";
    hair.stroke = "#ffffff";
}
function hairDown()
{
    console.log("hair");
    eyeTab(); faceTab(); weaponTab(); hairTab(); TabText(); tabLayout();
}
function eyesOver()
{
    eyes.fill = "#ff00000";
    eyes.stroke = "#ff0000";
}
function eyesOut()
{
    eyes.fill = "#ffffff";
    eyes.stroke = "#ffffff";
}
function eyesDown()
{
    console.log("eyes");
    hairTab();  faceTab(); weaponTab(); eyeTab(); TabText();tabLayout();
}
function faceOver()
{
    face.fill = "#00ff00";
    face.stroke = "#00ff00"
}
function faceOut()
{
    face.fill = "#ffffff";
    face.stroke = "#ffffff";
}
function faceDown()
{
    console.log("face");
    hairTab(); eyeTab();  weaponTab();  faceTab(); TabText();tabLayout();
}
function weaponOver()
{
    weapon.fill = "#ffff00";
    weapon.stroke = "#ffff00"
}
function weaponOut()
{
    weapon.fill = "#ffffff";
    weapon.stroke = "#ffffff";
}
function weaponDown()
{
    console.log("weapon");
    hairTab(); eyeTab();  faceTab(); weaponTab(); TabText();tabLayout();
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