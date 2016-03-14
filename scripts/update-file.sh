#!/bin/bash

# this script works

curl --include --request PATCH http://localhost:3000/files/56e5f78f2b96d59c5607bc48 \
  --header "Authorization: Token token=sNS+7j1qEtebMUH/CvxJtA==" \
  --header "Content-Type: application/json" \
--data '{
    "file": {
      "description": "Pusheen is NOT in the fridge"
    }
  }'
