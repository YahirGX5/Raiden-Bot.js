const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Select a member and kick them.')
        .addUserOption(option =>
            option
                .setName('target')
                .setDescription('The member to kick 😈')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),


        async execute(interaction) {
            // Comprueba si el usuario tiene permisos para expulsar
            if (!interaction.member.permissions.has('KICK_MEMBERS')) {
                return interaction.reply('No tienes permisos para expulsar a usuarios 🤔');
            }
    
            // Obtiene el usuario a expulsar
            const userToKick = interaction.options.getUser('target');
    
            // Comprueba si se proporcionó un usuario
            if (!userToKick) {
                return interaction.reply('Debes mencionar a un usuario para expulsar.');
            }
    
            // Expulsa al usuario
            const guildMember = interaction.guild.members.resolve(userToKick);
            await guildMember.kick();
    
            // Responde al comando
            await interaction.reply(`El usuario ${userToKick.tag} ha sido expulsado.`);


        }       
}

