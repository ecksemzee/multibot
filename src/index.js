// run start.sh instead this!

// imports
const fs = require("fs");
const { BotSettings } = require("../config.json");
const { Worker, isMainThread } = require("worker_threads");

// read tokens
function readTokens() {
    const file = BotSettings.TokensFile;
    try {
        return fs.readFileSync(`${file}`, {
            encoding: "utf-8",
            flag: "r"
        })
            .replace(/\r\n/g,'\n')
            .split('\n')
            .filter(
                function(line) {
                    if (line !== "")
                        return line;
                }
            );
    } catch(e) {
        console.log(`Had a problem reading tokens file! Make sure there is '${file}' exists!`); // best documentation ever, without specifying path
        process.exit();
    }
}

// main sequence 
console.log("Hold on, reading tokens");
var tokens = readTokens();
if (isMainThread) {
    console.log("Done! Now attempting to create workers and make workers log in.");
    for (var i = 0; i < tokens.length; i++) {
        new Worker("./src/bot.js", {
            argv:[
                tokens[i], 
                BotSettings.BotPrefix,
                i + 1
            ]
        });
    }
}
