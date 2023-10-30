const { SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');


module.exports = {

    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Use this to ban people! 😮')
        .addUserOption( option => 
            option.setName('target')
            .setDescription('The member to ban 😈')
            .setRequired(true) )
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .setDMPermission(false),


    async execute(interaction) {

        // Comprueba si el usuario tiene permisos para banear
        if (!interaction.member.permissions.has('BAN_MEMBERS')) {
            return interaction.reply('No tienes permisos para banear a usuarios.');
        }


        // Obtiene el usuario a banear
        const userToBan = interaction.options.getUser('target');

        // Comprueba si se proporcionó un usuario
        if (!userToBan) {
            interaction.reply('Se te olvido mencionar a quien debo banear 🧐');
        }
 
        // Banea al usuario
        const guildMember = interaction.guild.members.resolve(userToBan);
        await guildMember.ban();
 
        // Responde al comando
        await interaction.reply(`El usuario ${userToBan.tag} ha sido baneado 😈`);
    }

}