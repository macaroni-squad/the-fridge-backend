#!/bin/bash


curl --include --request PATCH http://localhost:3000/files/56e5f4f1d19fd51d166e431a \
  --header "Authorization: Token token=heW0X8I5hhkBas7ziBOalA==" \
  --header "Content-Type: application/json" \
  --data '{
      "file": {
        "title": "The title has been edited",
        "description": "This file has been edited"
      }
  }'
