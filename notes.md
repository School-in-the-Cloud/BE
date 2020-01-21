School in the Cloud
Backend Notes

Endpoints (/api...)

/auth/register
/auth/login

/volunteers/
/volunteers/:id
/volunteers/:id/todos

/admins/
/admins/:id
/admins/:id/todos

/students/
/students/:id



https://school-in-the-cloud.herokuapp.com/api/auth/register
{
	"password": "testing123",
	"email": "patrick4@testing.com",
	"first_name": "Patrick",
	"last_name": "Student Testing",
	"type": "student"
}



https://school-in-the-cloud.herokuapp.com/api/auth/login

{
	"password": "testing123",
	"email": "patrick4@testing.com"
}


filter volunteer by:
{
    property: value
}

CUD todo lists



TODO:
migration: add imgurl to volunteers
migration: add completed to todos and todo_items
SET UP AUTHENTICATION MIDDLEWARE
=> PUT ON THE ENDPOINTS
SET UP MIDDLEWARE TO CHECK USER TYPE
=> PUT ON THE ENDPOINTS
TESTING
edit volunteer profiles


migration to add completed, date created, date completed columns to todos

