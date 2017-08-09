/**
 * Created by laban on 2017-05-10.
 */
var boot = {
    preload: function()
    {
        log('boot','entered state');
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        //preload the images for the loading screen
        //game.load.image('preloadBar', 'assets/title_screen/RUFighter_logo.png');
        //game.load.image('logo','/assets/title_screen/vblack.png');
    },
    create: function()
    {
        this.state.start('preload');
    }
}