/**
 * Created by laban on 2017-05-16.
 */
var map = {
    preload: function () {
        console.log("MAP");
        //load the icons for setting, store, instructions, health, mana, coins
        game.load.image('coin','images/icons/coin2.png');
        game.load.image('store','images/icons/store.png');
        game.load.image('info','images/icons/info.png');
        game.load.image('mana','images/icons/manaHigher2.png');
        game.load.image('setting','images/icons/setting.png');
    },
    create: function () {
        //display the icons once they are created
        var coin = game.add.sprite(200, 20, 'coin');
        var store = game.add.sprite(200, 20, 'store');
        var info = game.add.sprite(200, 20, 'info');
        var mana = game.add.sprite(200, 20, 'mana');
        var setting = game.add.sprite(200, 20, 'setting');

        //coin.inputEnabled = true;
        store.inputEnabled = true;
        info.inputEnabled = true;
        //mana.inputEnabled = true;
        setting.inputEnabled = true;

        store.events.onInputDown(store_action, this);
        info.events.onInputDown(info_action, this);
        setting.events.onInputDown(setting_action, this);

        function store_action () {

            this.state.start('store');

        }
        function info_action () {

            this.state.start('info');
        }
        function setting_action () {

            this.state.start('setting');
        }
    },
    update: function() {

    }
};