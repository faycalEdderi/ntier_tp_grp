# n-tier TP solo

## Routes

Here is a list of all the routes in the application:

### Gateway url

- `http://localhost:4000/users`: url to point for user
- `http://localhost:5000/publications`: url to point for publications

### Endpoint

Use the gateway url and add the endpoint you need

- `http://localhost:4000/users/{ENDPOINT}`: url to point for user microservice
- `http://localhost:5000/publications/{ENDPOINT}`: url to point for publications microservice


### User Routes

- `POST /create`: Create a new user.
- `POST /login`: Login with a user.


### Publication Routes

- `GET /getPublications`: get all publications
- `GET /getPublication/:id`: Retrieve a specific publication by ID.
- `POST /create`: Create a new publication.
- `PUT /edit/:id`: Update an existing publication by ID.
- `DELETE /delete/:id`: Delete a publication by ID.

### Redis and cache (not finished)

The method cachePublication use the cache with redis which is configured to use the cache to get the publication and expire after 5min 
However the method and the logic need more dev to be implemented without regression in the rest of the code so cachePublication isn't use for the moment


### Frontend

- `http://localhost:3000/publications`: create publication
- `http://localhost:3000/register`: registration
- `http://localhost:3000/login`: login

