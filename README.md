# chat_bot_backend-api


## Features
1. Login
2. Signup
3. forgot password
4. logout
5. Create answer
6. Create list answer
7. Read answer
8. Update answer
9. View all answers
10. Delete answer

## Stack
1. Runtime Environment: `Node.js`
2. Language: `TypeScript`
3. Web Server: `Fastify`
4. ORM: `Prisma`
5. DB: `Postgres`

## Requirements
1. At least 10 endpoints
2. Authentication (JWT)
3. Validation
4. No Supabase
5. Deployed to AWS or Heroku

## Shcema
#### Login
| User          | type          | 
| ------------- | ------------- | 
| _id           | uuid          | 
| name          | String        | 
| email         | String        | 
| password      | hash          | 



 | Admin        | type          | 
| ------------- | ------------- | 
| Admin_id      | uuid          | 
| name          | String        | 
| email         | String        | 
| password      | hash          | 


 #### edit chat
 | chat         | type          | 
| ------------- | ------------- | 
| Admin_id      | uuid  (Admin) | 
| id_Ans        | ObjectId      | 
| category      | String        | 
| Answr         | String        | 
| keys to ques  | String        | 
