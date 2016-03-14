#!/bin/bash

curl --include --request PATCH http://localhost:3000/files/56e5eedbaaf20aef141ab133 \
  --header "Authorization: Token token=oJXWKxFozjR0S0d5tAYA8w==" \
  --header "Content-Type: application/json" \
  --data '{
      "file": {
        "title": "The title has been edited",
        "description": "This file has been edited"
      }
  }'
