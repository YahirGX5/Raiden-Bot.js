const { SlashCommandBuilder } = require('discord.js');
const connectionManager = require('../utilities/voiceConnectionManager.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('stop')
    .setDescription('Stop the music playing!'),


    async execute(interaction) {
        if (connectionManager.connection && connectionManager.player) {
            connectionManager.player.stop();
            connectionManager.connection.destroy();
            
            interaction.reply('Que cansancio, se me ha quebrado la voz de tanto cantar 😩 \n Pero bueno, hasta la proxima 👋')

        } else {
            interaction.reply('Entra a un canal de voz primero!🧐');
        }
    } 
}