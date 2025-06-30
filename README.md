#  Assignment Project: Library Management API with Express, TypeScript & MongoDB

## 🎯 Project Feature

A **Library Management System** using **Express**, **TypeScript**, and **MongoDB (via Mongoose)**.

Which includes:

*   Proper schema validation
*   Business logic enforcement (e.g., availability control on borrow)
*   Use of aggregation pipeline
*   At least one **Mongoose static or instance method**
*   Use of **Mongoose middleware** (`pre`, `post`)
*   Filtering features

* * *

## 🔧 Tech Stacks

*   **Express** and **TypeScript**
*   Connect to MongoDB using **Mongoose**
*   Environment Variables with **dotenv**

* * *

## Models

2 models used in this API application

**books** and **borrow**

## API endpoints

*books*

**POST** 
- to create a new book record

`https://assignment-bay-theta.vercel.app/api/books`

**GET** 
- to get all the books in the list 
`https://assignment-bay-theta.vercel.app/api/books`

- filtering and sorting option also enabled

`https://assignment-bay-theta.vercel.app/api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5`

- to get a specific book by bookId

 `https://assignment-bay-theta.vercel.app/api/books/:bookId`

-to update information through a bookId

 `https://assignment-bay-theta.vercel.app/api/books/:bookId`

-to drop a book through a bookId

 `https://assignment-bay-theta.vercel.app/api/books/:bookId`

*borrow*

**GET** 
- to get all the borrow information

`https://assignment-bay-theta.vercel.app/api/borrow`

**POST**
- to post a borrow request
`https://assignment-bay-theta.vercel.app/api/borrow`


## Instruction for local set up

- clone this repository to your local machine
- run `npm install` in the folder by cmd or ide for dependencies 
- collect the environement variables from developer 
- create a .env file in the root of the folder
- `npm run dev` command to run locally



### **Submission:**

## **GitHub Repository Link**

https://github.com/bornilshopno/book_keeping

## **Live Deployment Link**

https://assignment-bay-theta.vercel.app/

## **Video Explanation (Public Link)**


* * *





