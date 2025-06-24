const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve a static file or an inline HTML page on GET /
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>User Registration</title>
        <style>
          body {
            background: #f4f6f8;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 420px;
            margin: 60px auto;
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 16px rgba(0,0,0,0.08);
            padding: 32px 28px 24px 28px;
          }
          h1 {
            text-align: center;
            color: #333;
            margin-bottom: 24px;
          }
          label {
            font-weight: 500;
            margin-bottom: 6px;
            display: block;
            color: #222;
          }
          input {
            width: 100%;
            padding: 10px 8px;
            margin-bottom: 18px;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 1rem;
            transition: border 0.2s;
          }
          input:focus {
            border-color: #007bff;
            outline: none;
          }
          button {
            width: 100%;
            background: #007bff;
            color: #fff;
            border: none;
            padding: 12px;
            border-radius: 4px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.2s;
          }
          button:hover {
            background: #0056b3;
          }
          #message {
            text-align: center;
            margin-bottom: 16px;
            color: #28a745;
            font-weight: 500;
            min-height: 22px;
          }
          #users {
            margin-top: 32px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 12px;
            background: #fafbfc;
          }
          th, td {
            border: 1px solid #e0e0e0;
            padding: 10px;
            text-align: left;
          }
          th {
            background: #f1f3f6;
            color: #333;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>User Registration</h1>
          <div id="message"></div>
          <form id="userForm" autocomplete="off">
            <label for="username">Username:</label>
            <input type="text" id="username" required />

            <label for="email">Email:</label>
            <input type="email" id="email" required />

            <label for="password">Password:</label>
            <input type="password" id="password" required />

            <button type="submit">Register</button>
          </form>
          <button id="viewBtn" style="margin-top:10px;">View All Users</button>
          <div id="users"></div>
        </div>
        <script>
          // Handle submission to the backend at localhost:5000
          const userForm = document.getElementById('userForm');
          const messageDiv = document.getElementById('message');
          userForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;

            if (!username || !email || !password) {
              messageDiv.style.color = "#dc3545";
              messageDiv.textContent = "All fields are required.";
              return;
            }

            try {
              const response = await fetch('http://localhost:5000/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password })
              });
              const result = await response.json();
              if (response.ok) {
                messageDiv.style.color = "#28a745";
                messageDiv.textContent = "Your data is submitted!";
                userForm.reset();
              } else {
                messageDiv.style.color = "#dc3545";
                messageDiv.textContent = result.message || "Submission failed.";
              }
            } catch (error) {
              messageDiv.style.color = "#dc3545";
              messageDiv.textContent = "Error submitting form.";
            }
            setTimeout(() => { messageDiv.textContent = ""; }, 3000);
          });

          // Fetch user list from localhost:5000
          const viewBtn = document.getElementById('viewBtn');
          viewBtn.addEventListener('click', async () => {
            try {
              const response = await fetch('http://localhost:5000/view');
              const data = await response.json();

              const usersDiv = document.getElementById('users');
              if (!Array.isArray(data) || data.length === 0) {
                usersDiv.innerHTML = '<p>No users available.</p>';
                return;
              }

              let tableHtml = '<table><tr><th>Username</th><th>Email</th></tr>';
              data.forEach(user => {
                tableHtml += \`<tr><td>\${user.username || ''}</td><td>\${user.email || ''}</td></tr>\`;
              });
              tableHtml += '</table>';
              usersDiv.innerHTML = tableHtml;
            } catch (error) {
              document.getElementById('users').innerHTML = '<p style="color:#dc3545;">Error fetching user data.</p>';
            }
          });
        </script>
      </body>
    </html>
  `);
});

// Start the frontend server
app.listen(PORT, () => {
  console.log(`Frontend running on http://localhost:${PORT}`);
});