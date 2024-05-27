# About the app:

Backend of a To-Do List app built with Express MySQL, jwt, nodemailer, sequelize & bcrypt, features user authentication, task management, sharing task with other users along with CRUD operations, session handling, and notifying user on shared tasks.

## Features

- CRUD 
- Authentication
- Sharing and notifying user
- nodemailer

### Install and run the app

1. Clone repo & install dependencies

2. run below command:

    ```bash
    node server.js
    ```

### List Of All Routes
#### login, signup and get users
- **Login User**: [POST] https://your_server:port/user/login     
- **Signup Uset**: [POST] https://your_server:port/user/signup
- **Get User**: [GET] https://your_server:port/user/allusers

#### todo list
- **Create List**: [POST] https://your_server:port/todolist
- **Get List**: [GET] https://your_server:port/todolist/lists
- **Delete list**: [DELETE] https://your_server:port/todolist/:id
- **Mark as done**: [PATCH] https://your_server:port/todolist/update/:id

#### shared todo list
- **Create Shared List**: [POST] https://your_server:port/sharedtodolist/:uderId
- **Get Shared List**: [GET] https://your_server:port/sharedtodolist/lists
- **Delete Shared List**: [DELETE] https://your_server:port/sharedtodolist/delete/:id
- **Mark as done**: [PATCH] https://your_server:port/sharedtodolist/update/:id

#### notification
- **Get All Notifications**: [GET] https://your_server:port/notification/lists
- **Delete Notification**: [DELETE] https://your_server:port/notification/delete/:id
- **Update Notification**: [PATCH] https://your_server:port/notification/update/:id 





