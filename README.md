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

## ScreenShots
![WhatsApp Image 2026-01-27 at 12 03 25 PM](https://github.com/user-attachments/assets/55cd976a-480f-46c0-83cc-c13c89b2cff7)
![WhatsApp Image 2026-01-27 at 12 03 56 PM](https://github.com/user-attachments/assets/71982d4a-d168-46ee-9cbf-d9e5ab0b9109)
![WhatsApp Image 2026-01-27 at 12 02 56 PM](https://github.com/user-attachments/assets/d9d43cab-9f6d-43ed-a409-bfce00800959)
![WhatsApp Image 2026-01-27 at 12 10 19 PM](https://github.com/user-attachments/assets/a0dca707-4992-4c45-8e33-50a313f27d1e)
![WhatsApp Image 2026-01-27 at 12 01 59 PM](https://github.com/user-attachments/assets/b11f27cc-600f-4771-bf6f-53c048538d57)
![WhatsApp Image 2026-01-27 at 12 11 26 PM](https://github.com/user-attachments/assets/93517ad8-d581-496c-a2c5-064ee487e2ad)




### Created by -Saloni
