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

    }

}