var mongoose = require('mongoose');

var PlayerSchema = mongoose.Schema({

});

var Player = module.exports = mongoose.model('Player', PlayerSchema);

module.exports.createPlayer = function(newPlayer, callback)
{
    newPlayer.save(callback);
};

module.exports.getPlayerByUsername = function(username, callback)
{
    var query = {name: username};
    Player.findOne(query,callback);
}

module.exports.getPlayerById = function(id, callback){
    Player.findById(id, callback);
}

