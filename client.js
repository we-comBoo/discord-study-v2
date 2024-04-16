
const { Client, GatewayIntentBits, REST, Routes } = require("discord.js");
const { voiceStateUpdate } = require("./events/voiceStateUpdate");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});





client.once("ready", () => {
  console.log("Bot is ready!");
});






client.on("voiceStateUpdate", voiceStateUpdate);


client.login(process.env.DISCORD_TOKEN).catch((error) => {
  console.log(error);
  process.exit(1);
});



module.exports = client;
