
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
