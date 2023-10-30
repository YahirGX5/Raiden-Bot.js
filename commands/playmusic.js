const { SlashCommandBuilder } = require('discord.js');
const { doQuery } = require('../mysql.js');
const { joinVoiceChannel, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');
const { createAudioPlayer } = require('@discordjs/voice');
const connectionManager = require('../voiceConnectionManager.js')
const player = createAudioPlayer();
connectionManager.player = player;
const path = require('node:path');
require('dotenv').config();




//We get a random number to select the song
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}



// Function for get the song of the database
async function getSong() {
    let random_song = getRandomInt(1, process.env.MAX_SONGS);
    let song;

    try {

        
        await doQuery('SELECT `song` FROM `music` WHERE id = ?', [random_song])
        .then(rows => {

            song = rows[0].song;

        })
        .catch(err => {

            console.error(`Error al ejecutar doQuery ${err}`);

        });


        let final_path = path.join("C:/music", song);
        return final_path;


    } catch (error) {

        console.error(`Hubo un error al obtener la cancion \n ${error}`);

    }
}


//Getting the song and playing it
async function playSong() {

    //Choosing and getting the song from the database
    let pathOfSong = await getSong();

    //Creating the resource to play in the voice channel and playing it
    const resource = createAudioResource(pathOfSong);
    connectionManager.player.play(resource);
    connectionManager.connection.subscribe(connectionManager.player);
}


module.exports = {


    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play a random song!'),


    async execute(interaction) {

        try {


            //Getting the voice channel of user
            let voiceChannel = interaction.member.voice.channel;
        

            //Checking if the user is in a voice channel, then joins it with JoinVoiceChannel
            if (voiceChannel) {


                connectionManager.connection = joinVoiceChannel({
                    channelId: interaction.member.voice.channelId,
                    guildId: interaction.guildId,
                    adapterCreator: interaction.guild.voiceAdapterCreator,
                });

            

                //Playing a song
                playSong();
                interaction.reply('Musicaaa maestro 💃');

                

                //When the bot stops playing music, we reproduce another
                connectionManager.player.on(AudioPlayerStatus.Idle, () => {  
                    playSong();  
                });



                } else {

                interaction.reply('No estas en un canal de voz, conectate a uno!');

            }


        } catch (error) {

            console.error(`Hubo un error al entrar a voz! ${error}`);

        }

    }

}
