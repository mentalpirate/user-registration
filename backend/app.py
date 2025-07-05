from flask import Flask, request, jsonify
from dotenv import load_dotenv
from pymongo import MongoClient
from os import getenv
from flask_cors import CORS  # <-- Add this for CORS support

# loads environment variables
load_dotenv()

client = MongoClient(getenv('MONGO_URI'))
database = client[getenv('MONGO_DATABASE')]
collection = database[getenv('MONGO_COLLECTION')]

app = Flask(__name__)
CORS(app)  # <-- Enable CORS for all routes

@app.route("/submit", methods=["POST"])
def submit():
    try:
        data = request.get_json()  # Get JSON data from frontend
        if not data:
            return jsonify({"message": "No data provided"}), 400

        # Optional: Validate required fields
        if not all(k in data for k in ("username", "email", "password")):
            return jsonify({"message": "Missing fields"}), 400

        collection.insert_one({
            "username": data["username"],
            "email": data["email"],
            "password": data["password"]
        })
        return jsonify({"message": "User registered successfully"}), 201
    except Exception as e:
        return jsonify({"message": f"Error: {str(e)}"}), 500

@app.route("/view")
def view():
    try:
        results = collection.find({}, {"_id": 0, "password": 0})  # Exclude _id and password
        users = list(results)
        return jsonify(users), 200
    except Exception as e:
        return jsonify({"message": f"Error: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)