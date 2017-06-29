var mongoose = require('mongoose');

var PlayerSchema = mongoose.Schema({
    username: String,
    created: Boolean,
    class: String,
    specialization: String,
    level: Number,
    experience: Number,
    stats: {
        currentHealth: Number,
        maxHealth: Number,
        defence: Number,
        specialDefence: Number,
        attack: Number,
        specialAttack: Number,
        stamina: Number,
        mana: Number,
        precision: Number,
        healing: Number,
        buff: Number,
        condition: Number
    },
    appearance: {
        head : {
            eye: String,
            hair: String,
            face: String
        },
        clothes: {
            shirt: String,
            pants: String,
            jacket: String,
        }
    },
    equipment: {
        weapon: {
            name: String,
            icon: String,
            level: Number,
            stats: {
                levelRequirement: Number,
                currentHealth: Number,
                maxHealth: Number,
                defence: Number,
                specialDefence: Number,
                attack: Number,
                specialAttack: Number,
                stamina: Number,
                mana: Number,
                precision: Number,
                healing: Number,
                buff: Number,
                condition: Number
            },
        },
        armor: {
            helmet: {
                name: String,
                icon: String,
                level: Number,
                stats: {
                    levelRequirement: Number,
                    currentHealth: Number,
                    maxHealth: Number,
                    defence: Number,
                    specialDefence: Number,
                    attack: Number,
                    specialAttack: Number,
                    stamina: Number,
                    mana: Number,
                    precision: Number,
                    healing: Number,
                    buff: Number,
                    condition: Number
                }
            },
            shirt: {
                name: String,
                icon: String,
                level: Number,
                stats: {
                    levelRequirement: Number,
                    currentHealth: Number,
                    maxHealth: Number,
                    defence: Number,
                    specialDefence: Number,
                    attack: Number,
                    specialAttack: Number,
                    stamina: Number,
                    mana: Number,
                    precision: Number,
                    healing: Number,
                    buff: Number,
                    condition: Number
                }
            },
            pants: {
                name: String,
                icon: String,
                level: Number,
                stats: {
                    levelRequirement: Number,
                    currentHealth: Number,
                    maxHealth: Number,
                    defence: Number,
                    specialDefence: Number,
                    attack: Number,
                    specialAttack: Number,
                    stamina: Number,
                    mana: Number,
                    precision: Number,
                    healing: Number,
                    buff: Number,
                    condition: Number
                }
            },
            shoes: {
                name: String,
                icon: String,
                level: Number,
                stats: {
                    levelRequirement: Number,
                    currentHealth: Number,
                    maxHealth: Number,
                    defence: Number,
                    specialDefence: Number,
                    attack: Number,
                    specialAttack: Number,
                    stamina: Number,
                    mana: Number,
                    precision: Number,
                    healing: Number,
                    buff: Number,
                    condition: Number
                }
            }
        }
    },
    inventory: []
});

var Player = module.exports = mongoose.model('Player', PlayerSchema);

//creates a new player and saves to database
module.exports.createPlayer = function(newPlayer, callback)
{
    //should add validation
    newPlayer.save(callback);
};

//query database for player based on username
module.exports.getPlayerByUsername = function(username, callback)
{
    var query = {username: username};
    Player.findOne(query,callback);
}

//query database for player based on id
module.exports.getPlayerById = function(id, callback){
    Player.findById(id, callback);
}

/* To do
* Player save/update
* Validation
*/

