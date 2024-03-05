# authentication-jwtoken
This is a simple backend project for authentication and use of jwt token.
In the register field, I added a Past orders field to test for a future e-commerce project that might involve getting past orders from the user, but it shouldn't be there. It was just to test the functionality.

##Technologies used
Node.js Express.js Mongoose brcrypt, jsonwebtoken dotenv

##Script available
npm run start - runs the code
npm run dev - runs the code with auto refresh for development

##Making Requests using Postman
1) REGISTER (POST):

http://localhost:3000/register
method: POST
sample body (JSON): 
{ 
  "firstName": 'Your First Name Here',
  "lastName": 'Your Last Name Here',
  "email": 'Your email here',
  "password": 'Your password here',
  'pastOrders": [
    {
      "itemName": 'Toothbrush',
      "itemPrice": 7,
      "isItemOnSale": false,
      "itemSalePrice": 2
    
    }
  ]
}

2) LOGIN (POST)

http://localhost:3000/login
method: POST
sample body (JSON): 
{ 
  "email": 'Your email here',
  "password": 'Your password here',
}

3) GET ALL USERS (NOT PROTECTED)
method: GET
http://localhost:3000/users

4) GET SPECIFIC USER BY ID
method: GET
http://localhost:3000/users/:id