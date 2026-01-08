# BlogWeb

**BlogWeb** is a full-stack blogging platform where users and admins can create accounts, log in, and interact with posts and comments. The project uses **React (Vite)** for the frontend and **Node.js/Express** with **MongoDB** for the backend.

---

## Features

### User Roles
- **Admin**: Create, edit, delete posts, view all comments on posts.
- **User**: View posts, comment, edit and delete own posts, view comments.

### Common Features
- Account creation and login with email and password
- Role-based dashboards
- View all posts
- Comment on posts

### Planned Features (In Progress)
- Reply to others’ comments
- React to posts (like, love, support)
- Suggestion box
- Profile editing

---


## Project Structure
```
BLOGWEB/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── package.json
│   ├── package-lock.json
│   └── .env.example
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
└── .gitignore
```

---

## Installation

### 1. Clone the repository

git clone https://github.com/Saloni-Shukla78/BLOGWEB.git

cd BLOGWEB

### 2. Setup Backend

cd backend

npm install

cp .env.example .env             # Add actual MongoDB URI, JWT secret, etc.

npm run start                  # Start backend server

### 3. Setup Frontend
cd ../frontend

npm install

npm run dev                 # Start frontend server


```
Frontend runs on http://localhost:5173

Backend runs on http://localhost:3000 (or port from .env)

```

### Technologies Used

Frontend: React.js, Vite, Tailwind CSS

Backend: Node.js, Express

Database: MongoDB

Authentication: JWT

Version Control: Git & GitHub

### Future Enhancements

Reply to comments

Post reactions (like, love, support)

Suggestion box for users

User profile management

Notification system

Search and filter posts



### Created by -Saloni
