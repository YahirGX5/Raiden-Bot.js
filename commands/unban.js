const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('Use this to unban people! 😮')
        .addStringOption(option =>
            option.setName('userid')
                .setDescription('The ID of the member to unban 🥱')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .setDMPermission(false),

    async execute(interaction) {
        // Comprueba si el usuario tiene permisos para desbanear
        if (!interaction.member.permissions.has('BAN_MEMBERS')) {
            return interaction.reply('No tienes permisos para desbanear a usuarios.');
        }

        // Obtiene el ID del usuario a desbanear
        const userIdToUnban = interaction.options.getString('userid');

        // Comprueba si se proporcionó un ID de usuario
        if (!userIdToUnban) {
            return interaction.reply('Debes proporcionar el ID de un usuario para desbanear.');
        }

        // Desbanea al usuario
        await interaction.guild.bans.remove(userIdToUnban);

        // Responde al comando
        await interaction.reply(`El usuario con ID ${userIdToUnban} ha sido desbaneado.`);
    }
};