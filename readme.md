Recipe Manager API
A beginner-friendly RESTful CRUD API built using Node.js, Express and local JSON file for data persistence. This project demonstrates how to handle HTTP requests, parse request bodies, manage local server states, and manipulate data without an external database

Features
No database required: It uses a local recipes.json file to store and retrieve data.

Full CRUD Operations: Create, Read, Update and Delete recipes seamlessly.

Auto-generated IDs: IDs are auto-generated.

Input validation: Basic checks to prevent incomplete recipe submissions.

Tech Stack
Runtime Environment: Node.js
Backend Framework: Express.js
Data Storage: Local JSON file (fs module)
---
Project structure
Recipe-Api/
|---data/
|     |---recipes.json
|---controllers/
|     |---recipeControllers.js
|---routes/
|     |---recipeRoutes.js
|---app.js
|---package.json
|---package-lock.json
|---readme.md
---
Getting started
Installation
clone the repo and run npm install
---
API Reference 
1. Get All Recipes
Endpoint: GET /recipes
Description: Retrieves an array of all recipes.
Response (200 OK): 
[
    {
    "id": "",
    "name: "",
    "ingredients": [""],
    "instructions": "",
    "createdAt": 
    "timeToPrepare": 
    }
]
2. Get a Single Recipe
Endpoint: GET /recipe/:id
Description: Retrieves details of a specific recipe using its unique ID.
Response (200 OK): Returns the recipe object matching the ID.
Response (404 Not Found): {"message": "Recipe not found"}

3. Create a New Recipe
Endpoint: POST /recipes
Description: Saves a new recipe to the file
Headers: Content-Type: application/json
Request Body:
{
    "name": "",
    "ingredients": "",
    "instructions": "",
    "timeToPrepare": ""
}
Response (201 created): Returns the saved recipe object including its auto-assigned id.

4. Update an Existing Recipe
Endpoint: PUT /recipes/:id
Description: Modifies field updates for a specific recipe. Missing fields default to their existing values.
Request Body: Any fields you want to update (e.g, {"timeToPrepare": 30} in minutes)
Response (200 OK): Returns the updated recipe object.

5. Delete a Recipe
Endpoint: DELETE /recipes/:id
Description: Removes a recipe from the records.
Response (200 OK): {"message": "Recipe deleted successfully"}

6. Search Recipes 
Endpoint: GET /recipes/search?ingredients=tomato
Description: Search based on ingredient field
Validation
# Middleware Flow
# Field Validation (Required Fields)
