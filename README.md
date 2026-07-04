# GitHub Profile Analyzer API

A RESTful API built with **Node.js**, **Express.js**, **MySQL**, and the **GitHub REST API**. The application analyzes GitHub user profiles, stores user and repository information in a MySQL database, and provides APIs to retrieve and manage the stored data.

---

# Live API

**Render Deployment**

https://github-profile-analyzer-a5ve.onrender.com

---

# GitHub Repository

https://github.com/rachit3014/github-profile-analyzer

---

# Postman Collection

https://www.postman.com/flight-participant-88873717-s-team/github-profile-analyzer/collection/vxigl1b/github-profile-analyzer-api

---

# Tech Stack

- Node.js
- Express.js
- MySQL
- GitHub REST API
- Axios
- Render

---

# Features

- Fetch GitHub user profile using username.
- Store GitHub user details in MySQL.
- Store repository information.
- Store primary programming language.
- Store all languages used in each repository.
- Fetch all stored GitHub profiles.
- Fetch a single GitHub profile.
- Fetch repositories of a specific user.
- Delete a user profile and all associated repositories.
- Uses Foreign Key with **ON DELETE CASCADE**.

---

# Project Structure

```text
github-profile-analyzer/
│
├── config/
│   └── sql.js                 # MySQL database configuration
│
├── controllers/
│   ├── userController.js      # User APIs
│   └── repoController.js      # Repository APIs
│
├── models/
│   ├── user.js                # Users table creation
│   └── repo.js                # Repositories table creation
│
├── routes/
│   ├── index.js
│   ├── user.js
│   └── repo.js
│
├── .env
├── .gitignore
├── index.js
├── package.json
├── package-lock.json
├── README.md
└── github_analyzer.sql
```

---

# Project Workflow

1. User provides a GitHub username.
2. API fetches the user's public profile from GitHub.
3. User information is stored in MySQL.
4. API fetches all public repositories.
5. Repository details and programming languages are stored.
6. Stored information can be retrieved using APIs.
7. User profile and repositories can be deleted from the database.

---

# Installation

## Clone Repository

```bash
https://github.com/rachit3014/github-profile-analyzer.git

cd github-profile-analyzer
```

---

## Install Dependencies

```bash
npm install
```

---

## Configure Environment Variables

```env
PORT=8000

DB_HOST=

DB_PORT=

DB_USER=

DB_PASSWORD=

DB_NAME=

GITHUB_TOKEN=
```

---

## Run Project

```bash
npm start
```

Server will start at

```
http://localhost:8000
```

---

# Database Schema

## Users Table

| Column | Type |
|----------|------|
| id | INT (Primary Key) |
| username | VARCHAR(255) |
| name | VARCHAR(255) |
| followers | INT |
| following | INT |
| public_repos | INT |
| avatar_url | TEXT |
| profile_url | TEXT |

---

## Repositories Table

| Column | Type |
|----------|------|
| id | INT (Primary Key) |
| user_id | INT (Foreign Key) |
| repo_name | VARCHAR(255) |
| primary_language | VARCHAR(255) |
| languages | JSON |

**Relationship**

```
Users (1)
      │
      │
      ▼
Repositories (Many)
```

Foreign Key

```
repos.user_id → users.id
```

Cascade Rule

```
ON DELETE CASCADE
ON UPDATE CASCADE
```

---

# Sample Response

```json
{
    "message": "User profile data fetched successfully",
    "data": {
        "username": "octocat",
        "followers": 100,
        "following": 10,
        "public_repos": 25
    }
}
```

---

# Deployment

**Platform**

Render

**Live URL**

https://github-profile-analyzer-a5ve.onrender.com
