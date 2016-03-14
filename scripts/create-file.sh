#!/bin/bash

# works. Don't forget to use file and not fileSSSS. Run this with bash scripts/create-file.sh and make sure you have a file to upload in your scripts folder

curl --silent --request POST http://localhost:3000/files \
--header "Content-Type: application/json" \
--data '{
  "file": {
    "title": "dumplings",
    "location": "./dumplings.jpg",
    "description": "Pusheen in fridge",
    "_owner": "56e5f14ee095e3ae538a637d"
  }
}'
