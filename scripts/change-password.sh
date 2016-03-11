#!/bin/bash

curl --include --request PATCH http://localhost:3000/change-password/56e3284d2715bf055a0c6f8e \
  --header "Authorization: Token token=sNS+7j1qEtebMUH/CvxJtA==" \
  --header "Content-Type: application/json" \
  --data '{
    "passwords": {
      "old": "123",
      "new": "12345"
    }
  }'
