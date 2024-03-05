# authentication-jwtoken
This is a simple backend project for authentication and use of jwt token.
In the register field, I added a Past orders field to test for a future e-commerce project that might involve getting past orders from the user, but it shouldn't be there. It was just to test the functionality.

##Technologies used
Node.js Express.js Mongoose brcrypt, jsonwebtoken dotenv

##Script available
npm run start - runs the code
npm run dev - runs the code with auto refresh for development

##Making Requests using Postman
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

##Making Requests using Postman
http://localhost:3000/login
method: POST
sample body (JSON): 
{ 
  "email": 'Your email here',
  "password": 'Your password here',
}

