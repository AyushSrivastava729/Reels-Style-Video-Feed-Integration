# 🎬 Reels-Style Video Feed Integration (MERN Stack)

A **Reels-style short video-sharing web application** built with the **MERN stack (MongoDB, Express, React, Node.js)**.  
This project allows users to **upload, view, like, and manage short videos**, similar to **Instagram Reels or YouTube Shorts**.  
It includes a **secure backend with JWT authentication** and **cloud storage integration using ImageKit**.  
Users can also click a button on any reel to **view the uploader’s details**, creating an interactive and engaging user experience.

---

## 🚀 Tech Stack

### 🖥️ Frontend
- React (Vite)
- React Router DOM
- Axios
- Tailwind CSS (optional or custom CSS)

### ⚙️ Backend
- Node.js
- Express.js
- MongoDB Atlas (via Mongoose)
- JWT Authentication
- Multer (File Uploads)
- Bcrypt.js (Password Hashing)
- ImageKit (Video/Image Hosting)
- Cookie-Parser
- Dotenv
- UUID

---

## ✨ Features

✅ User Authentication (Register / Login) using JWT  
✅ Upload and Watch Short Videos (Reels)  
✅ Like and Save Reels  
✅ **Click to View Reel Uploader’s Details** 👤  
✅ Secure Cloud Uploads using **ImageKit**  
✅ MongoDB Atlas Integration  
✅ Password Encryption with Bcrypt  
✅ Modular Folder Structure  
✅ Easy Deployment Setup  

---

## 📁 Folder Structure
📦 Reels-Style-Video-Feed
 ┣ 📂 backend
 ┃ ┣ 📂 src
 ┃ ┃ ┣ 📂 controllers
 ┃ ┃ ┣ 📂 models
 ┃ ┃ ┣ 📂 routes
 ┃ ┃ ┣ 📂 services
 ┃ ┃ ┣ 📂 db
 ┃ ┃ ┣ 📜 app.js
 ┃ ┃ ┗ 📜 server.js
 ┃ ┣ 📜 .env
 ┃ ┗ 📜 package.json
 ┣ 📂 frontend
 ┃ ┣ 📂 src
 ┃ ┃ ┣ 📂 components
 ┃ ┃ ┣ 📂 pages
 ┃ ┃ ┣ 📂 assets
 ┃ ┃ ┗ 📜 main.jsx
 ┃ ┣ 📜 vite.config.js
 ┃ ┗ 📜 package.json
 ┣ 📜 .gitignore
 ┣ 📜 README.md
 ┗ 📜 package-lock.json

