# Jokes REST API – Node.js/Express

A simple backend server providing a REST API for managing jokes. Used as a practice backend for frontend development in React Academy.

## Getting Started

```bash
npm start
```

The server runs on port **8080**.

## Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| `GET` | `/jokes` | Returns a list of all jokes (optional query param `?category=GENERAL`) |
| `GET` | `/jokes/random` | Returns a random joke (optional query param `?category=GENERAL`) |
| `GET` | `/jokes/{jokeId}` | Returns a joke by ID |
| `POST` | `/jokes` | Creates a new joke |
| `PUT` | `/jokes/{jokeId}` | Updates a joke |
| `DELETE` | `/jokes/{jokeId}` | Deletes a joke |

## Joke Categories (`Category`)

- `GENERAL`
- `PROGRAMMING`
- `KNOCK_KNOCK`
- `DAD`

## Joke Structure (`Joke`)

```json
{
  "id": 1,
  "setup": "Why do Java programmers wear glasses?",
  "punchline": "Because they don't C#.",
  "category": "PROGRAMMING",
  "rating": 5
}
```

## Interactive Documentation (Swagger UI)

Available after starting the server at:

```
http://localhost:8080/api-docs
```

## Project Structure

```
jokes-server-restapi-node/
├── api/
│   └── openapi.yaml         # OpenAPI specification
├── controllers/
│   ├── Controller.js        # Infrastructure – do not modify
│   ├── DefaultController.js # Maps endpoints to service methods
│   └── index.js
├── dao/
│   └── joke-dao.js          # In-memory joke store
├── domain/
│   └── joke.js              # Joke domain object
├── services/
│   ├── DefaultService.js    # Business logic + data loading
│   ├── Service.js           # Infrastructure – do not modify
│   └── index.js
├── utils/
│   └── openapiRouter.js
├── config.js
├── expressServer.js
├── index.js
├── logger.js
└── package.json
```
