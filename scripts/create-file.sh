#!/bin/bash

# this curl script doesn't work, I'm actually not sure how to test this

curl --silent --request POST http://localhost:3000/files \
--header "Content-Type: application/json" \
--data '{
  "files": {
    "fileType": "jpg",
    "location": "../../tmp/pusheen-in-fridge.jpg"
    "description": "Pusheen in fridge"
  }
}'
