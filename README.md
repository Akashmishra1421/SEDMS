
# Space Exploration Data Management System

The Space Exploration Data Management System is a web-based application that helps manage space mission data efficiently. Built with Node.js and MySQL, it allows users to track and organize information about missions, astronauts, and spacecraft. The system provides essential CRUD operations, a user-friendly interface, and secure data handling, ensuring smooth and reliable data management.

## Features
Secure user authentication

Mission, astronaut, and spacecraft management

Dynamic frontend with real-time updates

MySQL database integration

Node.js backend handling server operations

Seamless AJAX-based data updates
## Technologies Used
Frontend: HTML, CSS, JavaScript

Backend: Node.js

Database: MySQL

Additional Libraries: AJAX, jQuery

## Setup Instructions
1. Run 
```bash
npm install
```
2. Change your database credentails in .env file.


> Note: If tables are already there, it is recommended to DROP the tables before running the below script. To drop all tables, 
```bash
node drop.js
```

3. Run setup script
```bash
node setup.js
```

4. Run
```bash
node app.js
```

5. Visit
http://localhost:3000
    