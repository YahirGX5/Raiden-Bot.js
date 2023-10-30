const { REST, Routes } = require('discord.js');
require('dotenv').config();
const fs = require('node:fs');
const path = require('node:path');

const commands = [];
const folderPath = path.join(__dirname, 'commands');
const files = fs.readdirSync(folderPath);



for (const file of files) {

    try {

        const filePath = path.join(folderPath, file);
        const command = require(filePath);

        if ('data' in command && 'execute' in command) {
            commands.push(command.data.toJSON());
        }

    } catch (error) {

        console.log(`Aqui algo ta mal, en especifico esto: \n ${error}`);

    }
    
    
}


// Construct and prepare an instance of the REST module
const rest = new REST().setToken(process.env.TOKEN);

(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);
    
        // The put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands },
        );
    
        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        console.error(`Algo salio malardo al registrar tus comandos \n ${error}`);
    }
})();

    
