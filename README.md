
# API
base URL: https://school-in-the-cloud.herokuapp.com/api

## Authentication
### Registration:
POST "/auth/register"

Request Body:
```
{
  "password": string (8 char min - required),
  "email": string (must include '@' and '.' - required),
  "first_name": string (required),
  "last_name": string (required),
  "type": string ('admin', 'volunteer', or 'student' - required),
  "availability": string (required for volunteer),
  "country": string (required for volunteer)
  "
}
```

Response Body:
```
{
  "user": {
    "id": integer (primary key for 'users' table),
    "password": string (hashed),
    "type": string,
    "first_name": string,
    "last_name": string,
    "email": string,
  },
  "roleInfo":
    {
      "id": integer (primary key for role table - 'admins', 'volunteers', 'students'),
      "availability": string (volunteers only),
      "country": string (volunteers only),
      "user_id": integer (same as "id" in "user" object above)
    },
  "token": string (will be required for protected routes)
}
```

### Login
POST "/auth/login"

Request Body:
```
{
  "password": string,
  "email": string
}
```

Response Body:
```
{
  "user": {
    "id": integer (primary key for 'users' table),
    "password": string (hashed),
    "type": string,
    "first_name": string,
    "last_name": string,
    "email": string,
  },
  "token": string
}
```

## Admins
 
 ### Create To-Do:
 POST to ``` https://school-in-the-cloud.herokuapp.com/api/admins/:id/todos```
 where id is the admin's user id.

 Request Body:
 ```
{
    "volunteer_id": number,
    "name": string,
    "items": array of strings
}
 ```

 Response Body:
 #### Note: I will change this to return the new todo.
 {
   "todo_id": number
 }

 
## Volunteers
### Get Assigned To-Dos:
GET to ```https://school-in-the-cloud.herokuapp.com/api/volunteers/:id/todos```
where id is volunteer's user id.

Response Body:
```
[
  {
    "todo_id": number,
    "admin_id": number,
    "volunteer_id": number,
    "steps": array of strings
  },
  ...
]
```