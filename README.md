# Issues API (Node + Express)

Simple REST API for managing issues.

## Requirements
- Node.js 18+

## Install
```bash
npm install

## How to Test the API

### Start the server
npm install
npm run dev

Server runs at: http://localhost:3000

### Health check
GET http://localhost:3000/health

### Create Issue
POST http://localhost:3000/issues

Body:
{
  "title": "Login not working",
  "description": "Button does nothing",
  "status": "open"
}

### Get All
GET http://localhost:3000/issues

### Update
PUT http://localhost:3000/issues/1

Body:
{
  "status": "closed"
}

### Delete
DELETE http://localhost:3000/issues/1
