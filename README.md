# User Registration Project

This project is a simple user registration application built using Node.js and Express. It allows users to register through a form and view all registered users.

## Project Structure

```
user-registration
├── src
│   ├── app.js
│   ├── routes
│   │   ├── auth.js
│   │   └── users.js
│   ├── controllers
│   │   └── userController.js
│   ├── models
│   │   └── User.js
│   ├── public
│   │   └── styles.css
│   └── views
│       ├── register.html
│       └── users.html
├── package.json
└── README.md
```

## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd user-registration
   ```

2. Docker compose:
   ```bash
   docker-compose up
   ```

3. **Access the application**:
   Open your browser and go to `http://localhost:3000/register` to access the registration form.

## Usage

- Fill out the registration form with your username, email, and password, then submit to register.
- Navigate to `http://localhost:3000/view` to see the list of registered users.

## Dependencies

- Express
- python-flask
- pymongo
