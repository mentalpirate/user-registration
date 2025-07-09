# User Registration App

This is a simple user registration application built with React. It allows users to register by providing their username, email, and password. The application also includes functionality to view all registered users.

## Features

- User registration form with validation
- Submit button to register users
- View Users button to display all registered users
- Aesthetic design for better user experience

## Project Structure

```
user-registration-app
├── public
│   └── index.html
├── src
│   ├── components
│   │   ├── RegistrationForm.jsx
│   │   └── UsersList.jsx
│   ├── api
│   │   └── index.js
│   ├── App.jsx
│   ├── App.css
│   └── index.js
├── package.json
└── README.md
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd user-registration-app
   ```

3. Install the dependencies:
   ```
   npm install
   ```

## Usage

1. Start the development server:
   ```
   npm start
   ```

2. Open your browser and go to `http://localhost:3000` to view the application.

## API Endpoints

- **POST /submit**: Submit user registration data.
- **GET /view**: Retrieve the list of registered users.

## Contributing

Feel free to submit issues or pull requests for improvements or bug fixes. 

## License

This project is licensed under the MIT License.