var mongoose = require('mongoose');

var classSchema = mongoose.Schema({
    classes: []
});

var Class = module.exports = mongoose.model('Class', classSchema);

module.exports.getClasses = function (callback) {
    Class.findOne({},callback);
}
