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
