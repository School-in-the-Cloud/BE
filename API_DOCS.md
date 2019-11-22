
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

## To-Dos

### Get To-Dos
GET to ```https://school-in-the-cloud.herokuapp.com/api/todos/```

Response Body (example):
```
[{
        "todos_id": 21,
        "admin_id": 1,
        "admin": [
            {
                "id": 1,
                "user_id": 1
            }
        ],
        "volunteer_id": 1,
        "volunteer": [],
        "name": "test 3 todo",
        "is_completed": false,
        "steps": [
            {
                "id": 13,
                "todos_id": 21,
                "description": "step 1 of test"
            },
            {
                "id": 14,
                "todos_id": 21,
                "description": "step 2 of test"
            },
            {
                "id": 15,
                "todos_id": 21,
                "description": "step 3 of test"
            }
        ]
},...]
```

### Get To-Do By ID
GET to ```https://school-in-the-cloud.herokuapp.com/api/todos/:id```

Response Body (example):
```
{
    "todos_id": 21,
    "admin_id": 1,
    "admin": [
        {
            "id": 1,
            "user_id": 1
        }
    ],
    "volunteer_id": 1,
    "volunteer": [],
    "name": "test 3 todo",
    "is_completed": false,
    "steps": [
        {
            "id": 13,
            "todos_id": 21,
            "description": "step 1 of test"
        },
        {
            "id": 14,
            "todos_id": 21,
            "description": "step 2 of test"
        },
        {
            "id": 15,
            "todos_id": 21,
            "description": "step 3 of test"
        }
    ]
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
 ```
 {
   "todo_id": number
 }
```

### Update To-Do
PUT to ```https://school-in-the-cloud.herokuapp.com/api/admins/:id/todos```

Request Body:
```
{
        "todo_id": integer,
        "name": new name, string,
        "steps": [
            {
                "id": step id, integer (same as todo_id above),
                "todos_id": same as todo_id above,
                "description": new description for step, string
            },
            {
                "id": step_id,
                "todos_id": integer (same as todo_id above),
                "description": new description for step, string
            },
        ]
}
```
 
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

### Update Volunteer Info:
PUT to ```https://school-in-the-cloud.herokuapp.com/api/volunteers/:id```

Request Body (example):
```
{
  "last_name": "New Last Name",
  "availability": "Night"
}
```

### Get Volunteer Info:
GET to ```http://school-in-the-cloud.herokuapp.com/api/volunteers/```

Response Body (example):
```
[
    {
        "id": 2,
        "first_name": "Patrick",
        "last_name": "New Last Name",
        "email": "patrick144@testing.com",
        "country": "Mexico",
        "availability": "Night"
    },
    {
        "id": 3,
        "first_name": "Patrick",
        "last_name": "Testing",
        "email": "patrick185@testing.com",
        "country": "Mexico",
        "availability": "Afternoons"
    },
    {
        "id": 4,
        "first_name": "Patrick",
        "last_name": "Testing",
        "email": "patrick195@testing.com",
        "country": "Mexico",
        "availability": "Afternoons"
    }
]
```

### Get Volunteers with Filter

GET to (example) ```http://school-in-the-cloud.herokuapp.com/api/volunteers/filter?country=Mexico```
