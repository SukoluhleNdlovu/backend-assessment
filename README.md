# Issues API (Node + Express)

This project is a simple REST API for managing issues.

## Requirements

- Node.js 18+  



## Installation

Clone the repository and install dependencies:

```bash
npm install
```

## Running the Service

### Development mode:

```bash
npm run dev
```

### Production mode:

```bash
npm start
```

### Server runs at:

```bash
http://localhost:3000
```

## How to Interact with the API:

### Health Check

GET /health

```bash
Example:
http://localhost:3000/health
```

### Create an Issue

POST /issues

```bash
Request Body:
{
  "title": "Login not working",
  "description": "Button does nothing",
  "status": "open"
}
```

 Valid status values:

```bash
"open"
"in-progress"
"closed"
```

### Get All Issues

```bash
GET /issues
```

### Get a Single Issue

```bash
GET /issues/:id
```

Example:

```bash
GET /issues/1
```

### Update an Issue

```bash
PUT /issues/:id
```

### Request Body example:

```bash
{
  "status": "closed"
}
```

### Delete an Issue

```bash
DELETE /issues/:id
```
Returns 204 No Content if successful.

### Running Tests
This project includes automated tests using Jest and Supertest.

```bash
npm test
```

### Swagger Docs
After running the server, open:

```bash
http://localhost:3000/docs
```

### Production docs:

```bash
https://backend-assessment-vvis.onrender.com/docs/
```