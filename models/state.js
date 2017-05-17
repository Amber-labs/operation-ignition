var mongoose = require('mongoose');

var stateSchema = mongoose.Schema({
    name: String,
    resources: []
});

var State = module.exports = mongoose.model('State', stateSchema);

module.exports.getStateByName = function (name, callback){
    var query = {name: name};
    State.findOne(query, callback);
}

module.exports.getStateById = function(id, callback){
    State.findById(id, callback);
}
