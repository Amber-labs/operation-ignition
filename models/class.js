var mongoose = require('mongoose');
var fs = require('fs');

var classSchema = mongoose.Schema({
    classes: [
        {
            label: String,
            name: String,
            icon: String,
            weapons: []
        }
    ],
    lastUpdate: {}
});

var Class = module.exports = mongoose.model('Class', classSchema);

//Ensure classes are loaded to database
Class.findOne({}, function(error, doc){
    //error loading classes from database
    if (error)
        console.log(error);
    else
    {
        //read the game classes file
        fs.readFile('templates/classes.json', 'utf-8', function(error, data){
            if (error)
                return console.log(error);
            //store to db
            else
            {
                var file = JSON.parse(data);
                var fileDate = new Date(file.lastUpdate);
                console.log(fileDate.toString());
                //if database document date is before the file
                if (!doc || doc && new Date(doc.lastUpdate) < fileDate)
                    updateClasses(file);
            }
        });
    }
});

function updateClasses(file)
{
    Class.collection.drop();
    var classes = new Class({
        classes: file.classes,
        lastUpdate: file.lastUpdate
    });
    classes.save(function (error, classes){
        if (error)
            throw error;
        else
            console.log(classes);
    });
}

module.exports.getClasses = function (callback) {
    Class.findOne({}, callback);
}
