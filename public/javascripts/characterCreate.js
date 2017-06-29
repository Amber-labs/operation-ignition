var classSpec;
var hair, eyes, face, body;
var bh, be, bf, bb;
var sol;

var style = { font: "30pt Courier", fill: "#ffffff", stroke: "#ffffff", strokeThickness: 2 , boundsAlignH: "center", boundsAlignV: "middle" };//{ font: "20px Courier", fill: "#fff", tabs: 132 };
var tabStyle = { font: "15pt Courier", fill: "#ffffff", stroke: "#ffffff", strokeThickness: 2 , boundsAlignH: "center", boundsAlignV: "middle" };//{ font: "20px Courier", fill: "#fff", tabs: 132 };
var images = {
    "classes" :[
        {
            name: "soldier",
            icon: '/images/Player/characters/soldier.png'
        },
        {
            name: "blackmage",
            icon: '/images/Player/characters/balckMage.png'
        },
        {
            name: "whitemage",
            icon: '/images/Player/characters/whitemage.png'
        },
        {
            name: "ranger",
            icon: '/images/Player/characters/ranger.jpeg'
        },
        {
            name: "mercenary",
            icon: '/images/Player/characters/mercenary.jpeg'
        }
    ],
    "hair" : [
        {
            name: "hair1",
            icon: '/images/Player/hair/templateHair1.png'
        },
        {
            name: "hair2",
            icon: '/images/Player/hair/templateHair2.png'
        },
        {
            name: "hair3",
            icon: '/images/Player/hair/templateHair3.png'
        },
        {
            name: "hair4",
            icon: '/images/Player/hair/templateHair4.png'
        },
        {
            name: "hair5",
            icon: '/images/Player/hair/templateHair5.png'
        },
        {
            name: "hair6",
            icon: '/images/Player/hair/templateHair6.png'
        },
        {
            name: "hair7",
            icon: '/images/Player/hair/templateHair7.png'
        },
        {
            name: "hair8",
            icon: '/images/Player/hair/templateHair8.png'
        },
        {
            name: "hair9",
            icon: '/images/Player/hair/templateHair9.png'
        }
    ],
    "eyes" : [
        {
            name: "eye1",
            icon: '/images/Player/eyes/templateEyes1.png'
        },
        {
            name: "eye2",
            icon: '/images/Player/eyes/templateEyes2.png'
        },
        {
            name: "eye3",
            icon: '/images/Player/eyes/templateEyes3.png'
        },
        {
            name: "eye4",
            icon: '/images/Player/eyes/templateEyes4.png'
        },
        {
            name: "eye5",
            icon: '/images/Player/eyes/templateEyes5.png'
        }
    ],
    "face" : [
        {
            name: "face1",
            icon: '/images/Player/faces/templateFace1.jpg'
        },
        {
            name: "face1",
            icon: '/images/Player/faces/templateFace2.jpg'
        },
        {
            name: "face1",
            icon: '/images/Player/faces/templateFace3.jpg'
        }
    ],
    "body" : [
        {
            name: "body1",
            icon: '/images/Player/Body/templateBody1.png'
        }
    ]
}



var characterCreate = {
    preload: function(){
        log('characterCreate','entered state');
        this.load.image('okay','/images/buttons/okay.png');
        // need to figure out how to load this images in a shorter manner (this is too repetative)
        /*
        this.load.image('soldier','/images/Player/characters/soldier.png');
        this.load.image('blackmage','/images/Player/characters/balckMage.png');
        this.load.image('whitemage','/images/Player/characters/whitemage.png');
        this.load.image('ranger','/images/Player/characters/ranger.jpeg');
        this.load.image('mercenary','/images/Player/characters/mercenary.jpeg');
        */
        // hair
        /*
        this.load.image('one','/images/Player/hair/templateHair1.png');
        this.load.image('two','/images/Player/hair/templateHair2.png');
        this.load.image('three','/images/Player/hair/templateHair3.png');
        this.load.image('four','/images/Player/hair/templateHair4.png');
        this.load.image('five','/images/Player/hair/templateHair5.png');
        this.load.image('six','/images/Player/hair/templateHair6.png');
        this.load.image('seven','/images/Player/hair/templateHair7.png');
        this.load.image('eight','/images/Player/hair/templateHair8.png');
        this.load.image('nine','/images/Player/hair/templateHair9.png');
        */
        // loading class icons
        for(i=0; i<images.classes.length; i++)
        {
            this.load.image(images.classes[i].name, images.classes[i].icon);
        }
        // loading hair icons
        for(i=0; i<images.hair.length; i++)
        {
            this.load.image(images.hair[i].name, images.hair[i].icon);
        }
        //lading eyes icons
        for(i=0; i<images.eyes.length; i++)
        {
            this.load.image(images.eyes[i].name ,images.eyes[i].icon);
        }
        //loading faces icons
        for(i=0; i<images.face.length; i++)
        {
            this.load.image(images.face[i].name ,images.face[i].icon);
        }
        for(i=0; i<images.body.length; i++)
        {
            this.load.image(images.body[i].name ,images.body[i].icon);
        }

    },
    buttons : {},
    create: function() {
        //design the character create screen
        var graphics = game.add.graphics(20,20);

        //------------------------class ----------------------
        // set a fill and line style again
        graphics.lineStyle(3, 0xEFF1ED, 0.5);
        graphics.beginFill(0xA2A79E, 0.0);
        graphics.drawRoundedRect(15,15,395,80,12);
        graphics.drawRoundedRect(15,105,395,game.height - 150,12);
        graphics.drawRoundedRect(25,game.height - 215,375,160,12);
       graphics.endFill();

        sol = game.add.image(50,150, 'soldier');
        sol.scale.setTo(0.2);

        classSpec = game.add.text(20, 20, classes.classes[0].name, style);
        classSpec.setTextBounds(15, 15, 400, 85);

        arrows(68, 300, "l", preClass, preClassOver, preClassOut, 0xde3c4b);
        arrows(400, 300, "r", nextClass, nextClassOver, nextClassOut, 0xde3c4b);


        tabs(game.width-400, 25, "Hair", 80);
        tabs(game.width-400, 200, "Eyes", 80);
        tabs(game.width-400, 375, "Face", 80);
        tabs(game.width-400, 550, "Weapons", 110);

        arrows(940, 85, "l", HLdown, HLover, HLout, 0xffffff);
        arrows(1200, 85, "r", HRdown, HRover, HRout, 0xffffff);
        arrows(940, 245, "l", ELdown, ELover, ELout, 0xffffff);
        arrows(1200, 245, "r", ERdown, ERover, ERout, 0xffffff);
        arrows(940, 435, "l", FLdown, FLover, FLout, 0xffffff);
        arrows(1200, 435, "r", FRdown, FRover, FRout, 0xffffff);



        bb = game.add.group();
        body = bb.create(470,25, images.body[0].name);
        body.scale.setTo(0.7);
        hairDisplay();
        eyesDisplay();
        faceDisplay();
        game.add.tween(bb.scale).to( {x: 1.2, y: 1.2}, 1000, Phaser.Easing.Back.InOut, true, 0, false).yoyo(true);

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
function arrows(x, y, side, down, over, out, color) {
    var arrows =  game.add.graphics(0,0);
    arrows.lineStyle(2, color, 1);
    arrows.beginFill(color, 1);
    var point1 = y + 2;
    var point2 = y + 50;
    var point3 = y + 25;
    if (side == "l")
    {
        arrows.moveTo(x,point1);
        arrows.lineTo(x,point2);
        arrows.lineTo(x-15,point3);
        arrows.lineTo(x,point1);
    }
    else
    {
        arrows.moveTo(x,point1);
        arrows.lineTo(x,point2);
        arrows.lineTo(x+15,point3);
        arrows.lineTo(x,point1);
    }
    arrows.inputEnabled = true;
    arrows.events.onInputDown.add(down, this);

    arrows.events.onInputOver.add(over, this);
    arrows.events.onInputOut.add(out, this);
    arrows.endFill();
}
function tabs(width, height, text, textL)
{
    var tab = game.add.graphics(20,20);
    // Hair Tab
    tab.beginFill(0xffffff, 0.2);
    tab.lineStyle(3, 0x9b2a34, 1);
    tab.moveTo(width,height);
    tab.lineTo(width+5, height);
    tab.lineTo(width+10, height-25);
    tab.lineTo(width+ textL, height-25);
    tab.lineTo(width+ textL + 10, height);
    tab.lineTo(game.width-65, height);
    tab.lineTo(game.width-65, height + 125);
    tab.lineTo(width, height + 125);
    tab.lineTo(width, height);
    tab.endFill();
    game.add.text(width+40, height, text, tabStyle);

}
var hairindex = 0;
function hairDisplay()
{
    hair = game.add.image(1015,55, images.hair[hairindex].name);
    hair.scale.setTo(0.4);
    bh = bb.create(500,55, images.hair[hairindex].name);
    bh.scale.setTo(0.4);
    player.appearance ={};
    player.appearance.head={};
    player.appearance.head.hair = images.hair[hairindex].name;
}
var eyeindex = 0;
function eyesDisplay()
{
    eyes = game.add.image(970, 235, images.eyes[eyeindex].name);
    eyes.scale.setTo(0.1);
    be = bb.create(550, 55, images.eyes[eyeindex].name);
    be.scale.setTo(0.1);
    player.appearance.head.eye = images.eyes[eyeindex].name;
}
var faceindex = 0;
function faceDisplay()
{
    face = game.add.image(1015, 415, images.face[faceindex].name);
    face.scale.setTo(0.1);
    bf = bb.create(600, 55, images.face[faceindex].name);
    bf.scale.setTo(0.1);
    player.appearance.head.face = images.face[faceindex].name;
}
var classIndex = 0;
function classDisplay(){
    if(classIndex <= 0)
    {
        console.log(classIndex);
        sol = game.add.image(50,150, 'soldier');
        sol.scale.setTo(0.3);
        player.classes = "soldier";
    }
    else if (classIndex == 1)
    {
        console.log(classIndex);
        sol = game.add.image(50,150, 'mercenary');
        sol.scale.setTo(0.3);
        player.classes = "mercenary";
    }
    else if (classIndex == 2)
    {
        console.log(classIndex);

        sol = game.add.image(50,150, 'blackmage');
        sol.scale.setTo(0.4);
        player.classes = "blackmage";
    }
    else if(classIndex == 3)
    {
        console.log(classIndex);

        sol = game.add.image(50,150, 'ranger');
        sol.scale.setTo(0.3);
        player.classes = "ranger";
    }
    else if (classIndex >= 4)
    {
        console.log(classIndex);

        sol = game.add.image(50,150, 'whitemage');
        sol.scale.setTo(0.3);
        player.classes = "whitemage";
    }
}
function preClass() {
    console.log("in pre class ");
    classSpec.destroy();
    classIndex--;
    if (classIndex > 0 )
    {
        sol.destroy();
        classDisplay();
        classSpec = game.add.text(20, 20, classes.classes[classIndex].name, style);
        classSpec.setTextBounds(15, 15, 400, 85);
    }
    else if (classIndex <= 0)
    {
        sol.destroy();
        classDisplay();
        classIndex = 0;
        classSpec = game.add.text(20, 20, classes.classes[classIndex].name, style);
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
        sol.destroy();
        classDisplay();
        classSpec = game.add.text(20, 20, classes.classes[classIndex].name, style);
        classSpec.setTextBounds(15, 15, 400, 85);
    }
    else if (classIndex >= classes.classes.length)
    {
        sol.destroy();
        classDisplay();
        classSpec = game.add.text(20, 20, classes.classes[classes.classes.length-1].name, style);
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
function tabover(cord, x, side){
    var arrow = game.add.graphics(0,0);
    arrow.lineStyle(2, 0xFB651D, 1);
    arrow.beginFill(0xFB651D, 1);

    var point1 = cord + 2;
    var point2 = cord + 50;
    var point3 = cord + 25;
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
//hair prev and next
function HLdown(){
    console.log("In hair l arrow clicked");
    hair.destroy();
    hairindex--;
    if(hairindex<=0)
    {
        bh.destroy();
        hairindex = 0;
        hair = game.add.image(1015,55, images.hair[hairindex].name);
        hair.scale.setTo(0.4);
        bh = bb.create(500,55, images.hair[hairindex].name);
        bh.scale.setTo(0.4);
    }
    else if (hairindex >= images.hair.length)
    {
        bh.destroy();
        hairindex = images.hair.length -1;
        hair = game.add.image(1015,55, images.hair[hairindex].name);
        hair.scale.setTo(0.4);
        bh = bb.create(500,55, images.hair[hairindex].name);
        bh.scale.setTo(0.4);
    }
    else
    {
        bh.destroy();
        hair = game.add.image(1015,55, images.hair[hairindex].name);
        hair.scale.setTo(0.4);
        bh = bb.create(500,55, images.hair[hairindex].name);
        bh.scale.setTo(0.4);
    }
    player.appearance.head.hair = images.hair[hairindex].name;
}
function HLover(){
    console.log("In hair L over");
    tabover(940,85,"l");
}
function HLout() {
    console.log("In hair L out");

}
function HRdown(){
    console.log("In hair r arrow clicked");
    hair.destroy();
    hairindex++;
   if (hairindex >= images.hair.length)
    {
        bh.destroy();
        hairindex = images.hair.length -1;
        hair = game.add.image(1015,55, images.hair[hairindex].name);
        hair.scale.setTo(0.4);
        bh = bb.create(500,55, images.hair[hairindex].name);
        bh.scale.setTo(0.4);
    }
    else
    {
        bh.destroy();
        hair = game.add.image(1015,55, images.hair[hairindex].name);
        hair.scale.setTo(0.4);
        bh = bb.create(500,55, images.hair[hairindex].name);
        bh.scale.setTo(0.4);
    }
    player.appearance.head.hair = images.hair[hairindex].name;
}
function HRover(){
    console.log("In hair R over");
    tabover(940,85,"l");
}
function HRout() {
    console.log("In hair R out");

}
//eyes prev and next
function ELdown(){
    console.log("In eyes l arrow clicked");
    eyes.destroy();
    eyeindex--;
    if(eyeindex<=0)
    {
        eyeindex = 0;
        eyes = game.add.image(970, 235, images.eyes[eyeindex].name);
        eyes.scale.setTo(0.1);
        be = bb.create(550, 55, images.eyes[eyeindex].name);
        be.scale.setTo(0.1);
    }
    else if (eyeindex >= images.eyes.length)
    {
        eyeindex = images.eyes.length -1;
        eyes = game.add.image(970, 235, images.eyes[eyeindex].name);
        eyes.scale.setTo(0.1);
        be = bb.create(550, 55, images.eyes[eyeindex].name);
        be.scale.setTo(0.1);
    }
    else
    {
        eyes = game.add.image(970, 235, images.eyes[eyeindex].name);
        eyes.scale.setTo(0.1);
        be = bb.create(550, 55, images.eyes[eyeindex].name);
        be.scale.setTo(0.1);
    }
    player.appearance.head.eye = images.eyes[eyeindex].name;

}
function ELover(){
    console.log("In eyes L over");
    tabover(940,245,"l");
}
function ELout() {
    console.log("In eyes L out");

}
function ERdown(){
    console.log("In hair r arrow clicked");
    eyes.destroy();
    eyeindex++;
    if (eyeindex >= images.eyes.length)
    {
        eyeindex = images.eyes.length -1;
        eyes = game.add.image(970, 235, images.eyes[eyeindex].name);
        eyes.scale.setTo(0.1);
        be = bb.create(550, 55, images.eyes[eyeindex].name);
        be.scale.setTo(0.1);
    }
    else
    {
        eyes = game.add.image(970, 235, images.eyes[eyeindex].name);
        eyes.scale.setTo(0.1);
        be = bb.create(550, 55, images.eyes[eyeindex].name);
        be.scale.setTo(0.1);
    }
    player.appearance.head.eye = images.eyes[eyeindex].name;

}
function ERover(){
    console.log("In eyes R over");
    tabover(940,85,"l");
}
function ERout() {
    console.log("In eyes R out");

}
//face prev and next
function FLdown(){
    console.log("In face l arrow clicked");
    face.destroy();
    faceindex--;
    if(faceindex<=0)
    {
        faceindex = 0;
        face = game.add.image(1015, 415, images.face[faceindex].name);
        face.scale.setTo(0.1);
        bf = bb.create(600, 55, images.face[faceindex].name);
        bf.scale.setTo(0.1);
    }
    else if (faceindex >= images.face.length)
    {
        faceindex = images.face.length -1;
        face = game.add.image(1015, 415, images.face[faceindex].name);
        face.scale.setTo(0.1);
        bf = bb.create(600, 55, images.face[faceindex].name);
        bf.scale.setTo(0.1);
    }
    else
    {
        face = game.add.image(1015, 415, images.face[faceindex].name);
        face.scale.setTo(0.05);
        bf = bb.create(600, 55, images.face[faceindex].name);
        bf.scale.setTo(0.11);
    }
    player.appearance.head.face = images.face[faceindex].name;

}
function FLover(){
    console.log("In face L over");
}
function FLout() {
    console.log("In face L out");
}
function FRdown(){
    console.log("In face r arrow clicked");
    face.destroy();
    faceindex++;
    if (faceindex >= images.face.length)
    {
        faceindex = images.face.length -1;
        face = game.add.image(1015, 415, images.face[faceindex].name);
        face.scale.setTo(0.1);
        bf = bb.create(600, 55, images.face[faceindex].name);
        bf.scale.setTo(0.1);
    }
    else
    {
        face = game.add.image(1015, 415, images.face[faceindex].name);
        face.scale.setTo(0.1);
        bf = bb.create(600, 55, images.face[faceindex].name);
        bf.scale.setTo(0.1);
    }
    player.appearance.head.face = images.face[faceindex].name;

}
function FRover(){
    console.log("In face R over");
}
function FRout() {
    console.log("In face R out");
}