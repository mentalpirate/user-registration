# User Registration App

A full-stack web application for user registration, built with **Flask** (Python) for the backend and **React** for the frontend.

## Features

- User registration and authentication
- RESTful API with Flask
- Responsive React frontend
- Modern UI/UX

## Tech Stack

- **Backend:** Python, Flask
- **Frontend:** React, JavaScript
- **Database:** MongoDB
- **API:** REST

## Getting Started

### Prerequisites

- Python 3.8
- Node.js & npm

### Backend Setup

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

## Project Structure

```
user-registration-app/
├── backend/      # Flask API
├── frontend/     # React app
└── README.md
```

## API Endpoints

- `POST /submit` - Register a new user
- `POST /view` - User Details 
