## 0. Note:

- The data interfaces for the request and response objects can be found at **src/interfaces/requests.interfaces.ts** and **src/interfaces/reponses.interfaces.ts**

- Middleware to protect the endpoints hasn't been implemented yet

## A. Implemented

#### /schools/

###### 1. Post:

- create a new school for the signed in user who has type of **school_owner**

###### 2. Get: (will be implemented with filters and pagination later)

- get all schools in the database

#### /students/

###### 1. Post:

- create a student profile for the user who has type of **student**

#### /auth/login/

###### 1. Post:

- check user credentials (email/pw) and return a signed JWT

#### /auth/register

###### 1. Post:

- create a new **User** and **Auth** records in the database and return a signed JWT

---


## B. NOT Implemented


#### /user/:user_id/


get: return user

put: update user

delete: remove user

#### /school/:school_id

put: edit

delete: remove

get: school

#### /school/:school_id/courses

post: create new course

get: get all courses

## /courses/:course_id

get: return course

put: edit

delete: remove

## /course/:course_id/schedule

get: gel all schedules

post: add new schedule

## /course/:course_id/schedule/:schedule_id

put: edit schedule

delete: remove schedule entry
