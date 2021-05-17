#!/bin/bash
# shell script to check for node 

echo "Please wait while I attempt to start up node"

#check if node exists
if [[ ! command -v node %> /dev/null ]] ; then
    echo "Please install node.js v14.xx.xx LTS!"
    exit
fi

NODEVER=$(node -v)

if [[ ! $NODEVER =~ ^v1[4-5](.*)[0-9] ]] ; then
    echo "Please upgrade node! Currently v16 is unsupported!"
    exit
fi

if [[ ! -e config.json ]] ; then
    printf "{\n\t\"BotSettings\": {\n\t\t\"BotPrefix\": \";\",\n\t\t\"TokensFile\": \"tokens.txt\",\n\t\t\t\"BotPresence\": {\n\t\t\t\"On\": false,\n\t\t\t\"Value\": \"hello\",\n\t\t\t\"UsePhoneAsStatusIcon\": false\n\t\t}\n\t}\n}" > config.json
fi

node "./src/index.js"
