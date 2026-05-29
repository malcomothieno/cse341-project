# Movie Database API — CSE 341 Project 2

A RESTful API for managing a movie database with full CRUD operations, data validation, error handling, and Swagger documentation.

## Tech Stack
- Node.js + Express
- MongoDB Atlas
- swagger-ui-express
- dotenv

## Project Structure (MVC)
```
cse341-project2/
├── server.js                      # Entry point — mounts routes and Swagger
├── routes/
│   ├── movies.js                  # Movie route definitions
│   └── directors.js               # Director route definitions
├── controllers/
│   ├── moviesController.js        # Movie request/response logic + validation
│   └── directorsController.js     # Director request/response logic + validation
├── models/
│   ├── db.js                      # MongoDB connection
│   ├── moviesModel.js             # Movie DB queries
│   └── directorsModel.js          # Director DB queries
├── data/
│   └── seed.js                    # Seed script (3 directors, 5 movies)
├── swagger.json                   # Full Swagger 2.0 API documentation
├── swagger.js                     # swagger-autogen script
├── project2.rest                  # REST client test file
├── .env.example                   # Template for environment variables
└── .gitignore                     # Excludes .env and node_modules
```

## Collections

### movies (8 fields — exceeds 7-field requirement)
| Field | Type | Required |
|-------|------|----------|
| title | string | ✅ |
| genre | string | ✅ |
| releaseYear | integer | ✅ |
| rating | number (0–10) | ✅ |
| durationMinutes | integer | ✅ |
| language | string | ✅ |
| synopsis | string | ✅ |
| directorName | string | ✅ |

### directors (5 fields)
| Field | Type | Required |
|-------|------|----------|
| firstName | string | ✅ |
| lastName | string | ✅ |
| nationality | string | ✅ |
| birthYear | integer | ✅ |
| knownFor | string | ✅ |

## API Endpoints

### Movies
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /movies | Get all movies |
| GET | /movies/:id | Get movie by ID |
| POST | /movies | Create movie (all 8 fields required) |
| PUT | /movies/:id | Update movie (validates field types) |
| DELETE | /movies/:id | Delete movie |

### Directors
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /directors | Get all directors |
| GET | /directors/:id | Get director by ID |
| POST | /directors | Create director (all fields required) |
| PUT | /directors/:id | Update director (validates field types) |
| DELETE | /directors/:id | Delete director |

## Setup
1. `npm install`
2. Copy `.env.example` to `.env` and fill in your MongoDB URI
3. `node data/seed.js` to populate the database
4. `npm start`
5. Visit `http://localhost:3000/api-docs`

## Deployment
Set these environment variables in Render:
- `MONGODB_URI`
- `DB_NAME=movieDB`
