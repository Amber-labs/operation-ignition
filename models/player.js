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
        condition: Number,
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

