// run start.sh instead this!

// imports
const { BotSettings } = require("../config.json");
const discord = require("discord.js");
const config = {
    "Token": process.argv[2],
    "Prefix": process.argv[3],
    "Id": process.argv[4]
};

// setting up the bot
const bot = new discord.Client({
    ws:{
        properties:{
            $browser:BotSettings.BotPresence.UsePhoneAsStatusIcon ? "Discord iOS" : "Discord"
        }
    }
});

bot.on("ready", () => {
    console.log(`Worker #${config.Id} logged in!`);
});

// if you have prior experience with js and discord.js, i guess, you can edit this event with more cmds or other config
bot.on("message", msg => {
  if (msg.content===">test")
    msg.channel.send(`I am #${config.Id} and I am fully functional!`);
});

// sequence start
bot.login(config.Token).catch(
    function(e) {
        console.log(`Worker #${config.Id} failed to log in!`);
        process.exit();
    }
);
