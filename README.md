# gigapet-be
Backend Section

All API requests are made to: **https://giga-back-end.herokuapp.com/**

## REGISTER (POST) User

a **POST** request to _/api/users/register_ will create a new user and return an object

`email must be in the form: anystring@anystring.anystring`

if not server will respond with :

```
{
    "message": "Please provide correct email for the user. Ex: anystring@anystring.anystring"
}
```

Form will need `name` , `password` , and `email` that are require for registration a user
URL: /api/users/register

Example data:

```
{
    "name":"Joshua",
    "password":"123",
    "email":"joshua@yahoo.com"
}

```

If posted succesfully, will return a object with message:

```

{
    "id": 5,
    "email": "joshua@yahoo.com",
    "message": "User: Joshua was registered succesfully"
}

```

If require field are not preset it will return a object with message:

```

{
    "message": "please provide name, password, and email for the user"
}

```

## LOGIN (POST) User

a **POST** request to _/api/users/login_ will return an object

URL: /api/users/login

Form will need `username` and `password`. If posted correctly, should get a response of:

```

{
    "message": "Welcome Joshua!",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijo1LCJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6InNvcmluQHlhaG9vLmNvbSIsImlhdCI6MTU1NTE5MTE4NiwiZXhwIjoxNTU1MjYzMTg2fQ.bmynQf4cFPjY3xRbf1aL5zdi90Fk7Kq51lcFX5smPQg",
    "id": 5
}

```

If require field are not preset it will return a object with message:

```

{
"message": "please provide username and password"
}

```

---

## GET ALL Users

a **GET** request to _/api/users_ will return all the users existing in database

URL: /api/users/

This route is restricted - a authorization header with the token its required
The respone will include the decoded token contains the id,email and role of the current user

If Successful, response should be 200 (OK). If unsuccessful, response should be 500. Example users data:

```
{
    "users": [
        {
            "id": 1,
            "name": "Mihai",
            "email": "mihsi@yahoo.com",
            "password": "123"
        },
        {
            "id": 2,
            "name": "Ion",
            "email": "ion@yahoo.com",
            "password": "123"
        },
        {
            "id": 3,
            "name": "Maria",
            "email": "maria@yahoo.com",
            "password": "123"
        },
    ],
    "decoded": {
        "subject": 7,
        "email": "cata@yahoo.com",
        "iat": 1555192150,
        "exp": 1555264150
    }
}
```

In case the token is not present in the header it will respond with:

```

{
"message": "Invalid Credentials"
}

```

## GET Users By ID

a **GET** request to _/api/users_ will return the user with specified ID

URL: /api/users/:id

This route is restricted - a authorization header with the token its required

If Successful, response should be 200 (OK), should get a response of:

```
{
    "id": 4,
    "name": "Mia",
    "email": "mia@yahoo.com"
}
```

If id does't exist in database will response with 404 and a message:

```

{
    "message": "Id not found"
}

```

If unsuccessful, response should be 500

In case the token is not present in the header it will respond with:

```

{
    "message": "Invalid Credentials"
}

```

## EDIT (PUT) User

URL: /api/users/:id

Nothing required, can change as few or as many things as wanted.

Example: Changing user 's `username` from Alex to Alexandru, and `email` from alex@yahho.com to newEmail@yahoo.com

```
{
    "name": "Alexadru",
    "email": "newEmail@yahoo.com
}
```

A successful post will return the updated user ID and a message. For example, the above edit will return:

```
{
    "updateID": "2",
    "message": "User: Alexandru Update succesfully"
}
```

If user with specified ID does't exist in database will response with 404 and a message:

```
{
    "message": "User not found"
}

```

If unsuccessful, response should be 500 and a message:

```
{
    "error": "error trying to update user"
}
```

## DELETE User

URL: /api/users/:id

Nothing required, can change as few or as many things as wanted.

A successful delete will return a object with a message, for example deleting a user succesfully will return:

```
{
    "message": "Delete Succesfully"
}
```

If user with specified ID doesn't exist in database will response with 404 and a message:

```
{
    "message": "User not found"
}
```

## ADD (POST) New Child

URL: /api/app/addchild

```
{
    "parentId":"2"
    "name":"Billy"   
}

```

## GET ALL Children

URL: /api/app/childnames

## ADD (POST) Food

---