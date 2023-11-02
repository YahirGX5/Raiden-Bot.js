const { Events, EmbedBuilder } = require('discord.js');
const { doQuery } = require('../utilities/mysql.js');
const { client } = require('../index.js');


// We create the embed for welcome the user
async function createEmbed(member) {

    try {

        const embed = new EmbedBuilder()
        .setTitle(`Welcome ${member.user.displayName}`)
        .setThumbnail(member.user.displayAvatarURL());

        return embed;

    } catch (error) {

        console.error(`Algo salio mal creando el embed \n ${error}`);

    }
    

}




// Send embed to welcome channel
async function sendWelcomeEmbed(member) {


    try {
        
        // Gets the welcome channel to send an embed
        const welcomeChannel = client.channels.cache.get('1169008010497106022');


        // Create the embed of the user
        const embedToSend = await createEmbed(member);


        // Sends an embed to a welcome channel
        welcomeChannel.send({ embeds: [embedToSend] });


    } catch (error) {

        console.error(`Algo salio mal enviando el embed de bienvenida \n ${error}`);

    }
    


}



// Inserting some data of user in our database
async function addMemberInDatabase(member) {

    try {

        // Getting the id and nickname of the user in discord 
        const user_id = member.id.toString();
        const name = member.user.displayName;


        // We insert the data in the database
        const result = await doQuery("INSERT INTO users (user_discord_id, user_name) VALUES (?, ?)", [user_id, name]);

    } catch (error) {

        console.error(`Algo salio mal agregando el usuario en la database \n ${error}`);

    }
    

}




async function assingRol(member) {

    try {

        // We assign the rol 'newbie' to the user
        const NEWBIE_ROLE_ID = '1169004185254100993';
        member.roles.add(NEWBIE_ROLE_ID, ['New member in server 🤍']);

    } catch (error) {

        console.error(`Algo salio mal asignando el rol \n ${error}`);

    }
    

}




module.exports = {


    name: Events.GuildMemberAdd,
    async execute(member) {


        try {


            // We assign the rol and insert the member to database
            await addMemberInDatabase(member);
            await assingRol(member);
            await sendWelcomeEmbed(member);


        } catch (error) {


            console.error(`Algo salio mal al agregar este usuario nuevo😲 \n ${error}`);


        }
    }
}

