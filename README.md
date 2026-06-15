# Contacts API — CSE 341 Project (W01/W02)

A RESTful API for managing contact information with full CRUD operations and Swagger documentation.

## Tech Stack
- Node.js + Express
- MongoDB Atlas
- swagger-ui-express + swagger-autogen
- dotenv

## Project Structure (MVC)
```
contacts-api/
├── server.js                    # Main entry point
├── db/
│   └── connect.js               # MongoDB connection
├── models/
│   └── contactsModel.js         # DB queries — targets 'contacts' collection
├── controllers/
│   └── contactsController.js    # Request/response logic + validation
├── routes/
│   ├── index.js                 # Root router — mounts /contacts
│   ├── contacts.js              # GET, POST, PUT, DELETE under /contacts
│   └── swagger.js               # Mounts /api-docs
├── data/
│   └── seed.js                  # Seeds 5 contacts into MongoDB
├── swagger.json                 # Swagger 2.0 API documentation
├── swagger.js                   # swagger-autogen script
├── contacts.rest                # REST client test file
├── .env.example                 # Template for environment variables
└── .gitignore                   # Excludes .env and node_modules
```

## Contact Schema (contacts collection)
| Field | Type | Required |
|-------|------|----------|
| firstName | string | ✅ |
| lastName | string | ✅ |
| email | string (validated) | ✅ |
| favoriteColor | string | ✅ |
| birthday | string (YYYY-MM-DD) | ✅ |

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /contacts | Get all contacts |
| GET | /contacts/:id | Get contact by ID |
| POST | /contacts | Create contact (all 5 fields required) |
| PUT | /contacts/:id | Update contact |
| DELETE | /contacts/:id | Delete contact |

## Setup
1. `npm install`
2. Copy `.env.example` to `.env` and fill in your MongoDB URI
3. `node data/seed.js` — inserts 5 sample contacts
4. `npm start`
5. Visit `http://localhost:3000/api-docs`

## Deployment (Render)
Add these environment variables in the Render dashboard:
- `MONGODB_URI`
- `DB_NAME=contactsDB`

Then update the `"host"` field in `swagger.json` to your Render URL.
