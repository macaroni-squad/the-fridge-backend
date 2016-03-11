#!/bin/bash

curl --silent --request POST http://localhost:3000/sign-up \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "an@example.com",
      "password": "123",
      "password_confirmation": "123"
    }
  }'

# curl --include --request POST http://localhost:3000/sign-up \
#   --header "Content-Type: application/json" \
#   --data '{
#     "credentials": {
#       "email": "another@example.email",
#       "username": another_user,
#       "password": "an example password",
#       "password_confirmation": "an example password"
#     }
#   }'
