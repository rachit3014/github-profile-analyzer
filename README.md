# GitHub Profile Analyzer API

## Tech Stack

- Node.js
- Express.js
- MySQL
- GitHub REST API

## Features

- Analyze GitHub profile
- Store user details in MySQL
- Store repositories and languages
- Fetch all users
- Fetch single user
- Delete user
- Fetch repositories of a user

## Installation

```bash
git clone <repo-url>

npm install

npm start
```

## Environment Variables

```
PORT=

DB_HOST=

DB_USER=

DB_PASSWORD=

DB_NAME=

DB_PORT=

GITHUB_TOKEN=
```

## API Endpoints

### Analyze User

POST /user/analyze?username=octocat

### Get All Users

GET /users

### Get Single User

GET /user?username=octocat

### Delete User

DELETE /user?username=octocat

### Get User Repositories

GET /repositories?username=octocat

## Database

MySQL

## Deployment

Render
