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
11/19
put and delete todo
GET admins/:id/todos
migration: add imgurl to volunteers
add volunteer and admin info to todo response

11/20
migration to add completed, date created, date completed columns to todos

