const { Events } = require('discord.js');
const { client } = require('../index.js');
const { doQuery } = require('../utilities/mysql.js');


async function deleteUserFromDatabase(member) {

    try {

        doQuery('DELETE FROM users WHERE user_discord_id = ?', [ member.id.toString() ]);

    } catch (error) {

        console.error(`Error al eliminar al usuario \n ${error}`);

    }

}


module.exports = {

    name: Events.GuildMemberRemove,
    async execute(member) {


        try {
        
            // Gets the goodbye channel to send a farewell
            const goodbyeChannel = client.channels.cache.get('1169715434791125124');
    
    
            // Sends the farewell
            goodbyeChannel.send(`Lamento que te tengas que ir ${member.user.displayName}, cuidate mucho! 🤗`);


            // And we delete the user from the database
            await deleteUserFromDatabase(member);
    
    
        } catch (error) {
    
            console.error(`Algo salio mal enviando la despedida \n ${error}`);
    
        }


    }

}