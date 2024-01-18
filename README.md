# Northcoders News API
 
Check out the live version of the API [here](https://northcoders-news-board.onrender.com/)

Explore the available endpoints through the '/api' endpoint or refer to the [endpoints.json](./endpoints.json) file.

## Overview

The Northcoders News API is a backend service designed to provide programmable access to application data. Modelled after real-world backend services like Reddit, its primary purpose is to deliver information to the front-end architecture of an application.

## Prerequisites 

Ensure that you have the following minimum versions installed to run the project:

- Node.js: v21.0.0
- PostgreSQL: 14.9

## Getting Started

To get started with the Northcoders News API, follow these steps:

1. Clone the repository locally, using the following command: git clone https://github.com/livdawson/nc-news.git
2. Navigate to the project directory
3. Install project dependencies, by running the following command: npm install
4. Create two environment files: '.env.test' and '.env.development' at the top-level of the project directory. Add 'PGDATABASE=database-name-here' to each, with the correct database name for that environment. This will allow you to successfully connect to the two databases locally.
5. Seed the local database with sample data, by running the following command: npm run seed
6. Run the tests, using the following command: npm test


