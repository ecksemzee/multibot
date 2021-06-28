#!/bin/bash
# shell script to check for node 

printf "Please wait while I attempt to start up node\n"

#check if node exists
command -v node %> /dev/null || (printf "Node is not installed on your system.\n" && exit)

# get node ver and checl
[ -z "$(node -v | grep '^v1[4-6]')" ] && (printf "Upgrade your node to at least v14" && exit)

# check for config file
test -f config.json || printf "{\n\t\"BotSettings\": {\n\t\t\"BotPrefix\": \";\",\n\t\t\"TokensFile\": \"tokens.txt\",\n\t\t\t\"BotPresence\": {\n\t\t\t\"On\": false,\n\t\t\t\"Value\": \"hello\",\n\t\t\t\"UsePhoneAsStatusIcon\": false\n\t\t}\n\t}\n}" > config.json

node ./src/index.js
