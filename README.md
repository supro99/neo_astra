# neo_astra
REST APIs in nodejs

## PROJECT EXECUTION SETUP
1) git clone the project from the repository online 
(link - https://github.com/supro99/neo_astra.git)
2) Enter your MongoDB database connection string in config(folder) > config.js(file) > database_url(variable)
3) To get required module to run the project > npm install (if failed to execute, try -> sudo npm install)
4) To start the nodejs server -> npm start
5) Also the npm modules needed to run the project are 
	a)MongoDB - npm i mongo
	b)jsonwebtoken - npm i jsonwebtoken
	c)bcruptjs - npm i bcryptjs


## DATABASE ARCHITECTURE
1) Mongodb is used to store, retrieve and manipulate the data.

2) Only one database is created, named as - 'neo-astra-db'

3) This DB has two collections called as 'employee' and 'expenses' collections.
    These collection has all the employee and expense related data and all the operations are performed on this data.


## PROJECT ARCHITECTURE
Technology used for the project - Node.js, Express.js, MongoDB

1) This project uses ES6 syntax of javascript.

2) All the routes are in "routes" folder inside "employeeExpenses.js" file. You can navigate to each function from here.

3) All the business logic is written in "services" folder inside the "expenseServices.js" file.

4) Middleware to authenticated and verify JWT token is written in "auth" folder inside "verifyToken.js" file

5) All the constants/configuration strings are inside the config folder, such as database connection url, database name, some key secrets (not to be written in config file but to be placed in .env variable for security and privacy purpose)


## API DOCUMENTATION
This project has following API endpoints

A Middleware authentication mechanism is established before all APIs execution, except while registering new user and login existing user, to check if the user who is requesting the resources is valid user or not. 
This can be found in 'auth' folder in verifyToken.js file.

1)API for employee Registration (SignUp)
		curl --location --request POST 'localhost:3000/expenses/signup' \--header 'Content-Type: application/json' \--data-raw '{"name" : "Rekha Sharma", "mobile"  : 9493522249, "email" :"rekha@gmail.com","password" : "rekha@39"}'



2)API for employee LogIn
		curl --location --request POST 'localhost:3000/expenses/login' \ --header 'Content-Type: application/json' \ --data-raw '{"email" :"rekha@gmail.com", "password" : "rekha@39" }'

3)API for Creating a expense
		curl --location --request POST 'localhost:3000/expenses/' \--header 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOTgwYjY5YzExNjg3MjgyYWNkZGY4ZSIsImlhdCI6MTYyMDU3NzE0NiwiZXhwIjoxNjIwNjYzNTQ2fQ.Q-k99H9fVinbbmNEgrqej-NjMp5QUS6k6QyuCvVHJ9A' \--header 'Content-Type: application/json' \--data-raw '{"submitDate": "24/01/2019","employeeId": "nfhddk33","itemType": "Expense","type": "furniture","amount": { "value": 10200, "currency": "INR" },"description": "New furniture","status": "Pending" }'

4)API for Getting all the expense 
		curl --location --request GET 'localhost:3000/expenses/' \--header 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOTgwYjY5YzExNjg3MjgyYWNkZGY4ZSIsImlhdCI6MTYyMDU3NzE0NiwiZXhwIjoxNjIwNjYzNTQ2fQ.Q-k99H9fVinbbmNEgrqej-NjMp5QUS6k6QyuCvVHJ9A'

5)API for Updating an expense by expenseID
		curl --location --request PATCH 'localhost:3000/expenses/' \
		--header 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOTgwYjY5YzExNjg3MjgyYWNkZGY4ZSIsImlhdCI6MTYyMDU3NzE0NiwiZXhwIjoxNjIwNjYzNTQ2fQ.Q-k99H9fVinbbmNEgrqej-NjMp5QUS6k6QyuCvVHJ9A' \
		--header 'Content-Type: application/json' \
		--data-raw '{ "expenseId" : "60980ba4c11687282acddf8f", "dataToUpdate" :
        {
            "submitDate": "9/12/2019",
            "itemType": "Expense",
            "type": "Gas",
            "amount": { "value": 1000, "currency": "INR" },
            "description": "",
            "status": ""
        }
}'


5)API for Deleting an expense by expenseId
		curl --location --request DELETE 'localhost:3000/expenses/' \
		--header 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOTgwYjY5YzExNjg3MjgyYWNkZGY4ZSIsImlhdCI6MTYyMDU3NzE0NiwiZXhwIjoxNjIwNjYzNTQ2fQ.Q-k99H9fVinbbmNEgrqej-NjMp5QUS6k6QyuCvVHJ9A' \
		--header 'Content-Type: application/json' \
		--data-raw '{"expenseId" : "60980ba4c11687282acddf8f" }'

