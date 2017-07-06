# Ignite! [![Badge]][Travis]

# Summary
Operation ignition is a Online Web base real time Multiplayer, RPG game. Ignite will feature random terrain generation, with both perfect maze and procedurally generated styles. Ignite will also have a variety of standard RPG features like classes, guilds, items, quests and more!

# Technologies
Our project is based on the mean stack with other technologies such as Socket.IO, JQuery, Bootstrap and more to come.

# Endpoints
|  Endpoint  |  GET  |  POST  |  PUT  |
| :--------: | :---: | :----: | :---: |
| /api/players/data | returns current user's player data | updates current user's player data | not in use |
| /api/classes/data | return list of all the games classes | not in use | not in use |

# Reference
* [player][player] global object containing the game related data like health, specialization, location, inventory, ect. For more specific details check out the [schema][playerSchema]

[playerSchema] : https://github.com/Amber-labs/operation-ignition/blob/d1ff4ed1a38bae73e25f55efaebf31b53e03d103/models/player.js
[player]: https://github.com/Amber-labs/operation-ignition/blob/d1ff4ed1a38bae73e25f55efaebf31b53e03d103/public/javascripts/game.js#L2
[Travis]: https://travis-ci.org/Amber-labs/operation-ignition
[Badge]: https://travis-ci.org/Amber-labs/operation-ignition.svg?branch=master
