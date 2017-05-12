/**
 * Created by laban on 2017-05-10.
 */
var load = {
    preload: function()
    {
        console.log("LOAD");

        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.setScreenSize();
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        //load the images or call the json file for the images


    },
    create: function () {
        //particles.lights = this.add.group();
        this.state.start('logo');
    },
    update: function () {
        console.log('in update function of LOAD file');
    }

};