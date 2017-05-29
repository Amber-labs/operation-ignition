var mongoose = require('mongoose');
var fs = require('fs');

var classSchema = mongoose.Schema({
    classes: []
});

var Class = module.exports = mongoose.model('Class', classSchema);

//Ensure classes are loaded to database
Class.findOne({}, function(error, doc){
    //error loading classes from database
    if (error)
        console.log(error);
    else
    {
        //if database is empty
        //if (!doc)
        {
            //read the game classes file
            fs.readFile('templates/classes.json', 'utf-8', function(error, data){
            Class.collection.drop();
                if (error)
                    return console.log(error);
                //store to db
                else
                {
                    var file = JSON.parse(data)
                    var classes = new Class({
                        classes: file.classes
                    });
                    classes.save(function (error, classes){
                        if (error)
                            throw error;
                        else
                            console.log(classes);
                    });
                }
            });
        }
    }
});

module.exports.getClasses = function (callback) {
    Class.findOne({}, callback);
}
