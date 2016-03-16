# The Fridge Back-End

This is the back-end API for our file storage web app "The Fridge". The front-end
repo is [here](https://github.com/macaroni-squad/the-fridge-frontend).

The Fridge is a RESTful API that uses MongoDB and Amazon Web Services (AWS),
allowing users to upload and store files from their computer. File data and
location are saved into our database, and the actual file itself is hosted in an
AWS bucket.

## NPM Packages

Our API utilizes the following npm modules:
*[`express`](https://www.npmjs.com/package/express)
*[`mongoose`](https://www.npmjs.com/package/mongoose)
*[`multer`](https://www.npmjs.com/package/multer)
*[`aws-sdk`](https://www.npmjs.com/package/aws-sdk)
*[`crypto`](https://www.npmjs.com/package/crypto)

## API

The files controller and routes handles user interaction with the files.

### Authentication

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| POST   | `/sign-up`             | `users#signup`    |
| POST   | `/sign-in`             | `users#signin`    |
| PATCH  | `/change-password/:id` | `users#changepw`  |
| DELETE | `/sign-out/:id`        | `users#signout`   |

### Users

| Verb | URI Pattern | Controller#Action |
|------|-------------|-------------------|
| GET  | `/users`    | `users#index`     |
| GET  | `/users/1`  | `users#show`      |

### Files

| Verb   | URI Pattern   | Controller#Action |
|--------|---------------|-------------------|
| GET    | `/files`      | `files#index`     |
| POST   | `/files`      | `files#create`    |
| PATCH  | `/files/:id`  | `files#update`    |
| DELETE | `/files/:id`  | `files#destroy`   |

#### GET /files

Request:

```sh
curl --include --request GET http://localhost:3000/files/
  --header "Authorization: Token token=$TOKEN" \
```

#### POST /files

Request:

```sh
curl --include --request POST http://localhost:3000/files \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=$TOKEN" \
  --data '{
    "file": {
      "title": "Pusheen",
      "description": "Pusheen in fridge"
    }
  }'
```

#### PATCH /files/:id

Request:

```sh
curl --include --request PATCH http://localhost:3000/files/$ID \
  --header "Authorization: Token token=$TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
      "file": {
        "title": "The title has been edited",
        "description": "This file has been edited"
      }
  }'
```

#### DELETE /files/:id

Request:

```sh
curl --include --request DELETE http://localhost:3000/files/$ID \
  --header "Authorization: Token token=$TOKEN"
```
