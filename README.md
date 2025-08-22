# Urban Pro System

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=FFD62E)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=jsonwebtokens)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

A smart **Urban Pro System** for managing city services, infrastructure, and resources efficiently using modern web technologies.  
This project is built with a **Node.js/Express backend** and a **React (Vite) frontend**, with MongoDB as the database.

---

## 🚀 Features
- 🏙️ **User Management** – Register, login, and manage user profiles  
- 📍 **Service Providers** – Find available providers in real-time  
- 🔐 **Authentication & Authorization** – Secure login using JWT  
- 📊 **Data Management** – Store and manage urban service data in MongoDB  
- ⚡ **Error Handling** – Centralized error handler for API responses  
- 🎨 **Frontend** – Responsive React UI for user interaction  
- 🔔 **Cron Jobs** – Background tasks like booking expiry checks  

---

## 🛠️ Tech Stack
**Frontend:** React (Vite), JSX, CSS  
**Backend:** Node.js, Express.js  
**Database:** MongoDB (Atlas)  
**Authentication:** JWT (JSON Web Token)  
**Others:** Cron Jobs, dotenv  

---

## 📂 Project Structure

URBANPRO_SYSTEM/
│── backend/                     # Backend (Node.js + Express + MongoDB)
│   ├── config/                  # DB & environment configuration
│   │   └── db.js
│   ├── controllers/             # Controllers (business logic)
│   │   ├── auth.controller.js
│   │   ├── booking.controller.js
│   │   ├── review.controller.js
│   │   ├── service.controller.js
│   │   └── user.controller.js
│   ├── jobs/                    # Scheduled / cron jobs
│   │   ├── index.js
│   │   └── reassignProviders.job.js
│   ├── middlewares/             # Custom middlewares
│   │   └── auth.middleware.js
│   ├── models/                  # MongoDB Models
│   │   ├── booking.model.js
│   │   ├── payment.model.js
│   │   ├── providerProfile.model.js
│   │   ├── review.model.js
│   │   ├── service.model.js
│   │   └── user.model.js
│   ├── routes/                  # Routes
│   │   └── (your route files here)
│   ├── utils/                   # Utility functions
│   │   ├── findAvailableProvider.js
│   │   ├── generateToken.js
│   │   └── handleError.js
│   ├── .env                     # Environment variables
│   ├── server.js                # Main entry point
│   ├── package.json
│   └── package-lock.json
│
│── frontend/                    # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   ├── contexts/            # React Context API
│   │   ├── data/                # Static / mock data
│   │   ├── pages/               # Page-level components
│   │   ├── utils/               # Helper functions
│   │   ├── App.jsx              # Root React Component
│   │   ├── main.jsx             # Entry point
│   │   └── index.css            # Global styles
│   ├── public/                  # Static files (favicon, images, etc.)
│   ├── .env.sample
│   ├── vite.config.js
│   ├── index.html
│   ├── package.json
│   └── package-lock.json
│
│── README.md
│── LICENSE
│── .gitignore



---

## ⚙️ Installation & Setup

1️⃣ Clone the repository
```bash
git clone https://github.com/Badalsingh25/urban-pro-system.git
cd urban-pro-system

2️⃣ Setup Backend
cd backend
npm install

** Create a .env file inside backend/:
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

**Start backend server:
npm start

3️⃣ Setup Frontend
cd ../frontend
npm install
npm run dev

The frontend will start on http://localhost:5173/
(by default).
🔒 Environment Variables

Example .env.sample:

PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/
JWT_SECRET=supersecretkey123

🤝 Contributing

Fork the project

Create your feature branch (git checkout -b feature/your-feature)

Commit your changes (git commit -m 'Add new feature')

Push to the branch (git push origin feature/your-feature)

Open a Pull Request

📜 License

This project is licensed under the MIT License – feel free to use and modify it.

👨‍💻 Author

Badal Singh
🔗 GitHub Profile

✨ Building smart cities with smart code! ✨
