#  ShramSetu

**ShramSetu** is a digital platform that connects daily wage workers — such as electricians, plumbers, carpenters, masons, and painters — with local employers who need their services.  
It acts as a bridge (“Setu”) between **employers** and **workers**, enabling job postings, discovery, and hiring in a simple and transparent way.

---

##  Features

###  For Workers (Employees)
- Sign up and create a worker profile (skills, location, experience)
- Discover nearby jobs based on category and distance
- Accept or reject job offers
- Track assigned jobs and completion status
- Secure login using Firebase Authentication

###  For Employers
- Register and create an employer profile
- Post new job requirements (title, description, pay, and location)
- View available workers and hire instantly
- Manage active and completed job posts

###  Common Features
- Location-based job discovery using Maps API
- Real-time updates for new job postings
- Responsive UI built in React
- RESTful backend in Node.js with Express
- Authentication and role-based access (Employer/Employee)
- MongoDB database for scalable data storage

---

##  Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | React.js (with Tailwind / Material UI) |
| **Backend** | Node.js + Express |
| **Database** | MongoDB |
| **Authentication** | Firebase Auth |
| **API Type** | REST APIs |
| **Hosting (optional)** | Vercel / Render / AWS |


---
## Frontend
<img width="1919" height="1039" alt="image" src="https://github.com/user-attachments/assets/36073088-160b-4af1-b09c-4af568fbede5" />


<img width="1903" height="982" alt="image" src="https://github.com/user-attachments/assets/4e267986-49a2-4051-89c4-c38360875d72" />


<img width="1894" height="921" alt="image" src="https://github.com/user-attachments/assets/53c7639b-74a9-42ff-8339-86a0a172d764" />


<img width="1903" height="921" alt="image" src="https://github.com/user-attachments/assets/0ae3fd2c-0c2c-4852-8813-43d3f2ede408" />


<img width="1919" height="981" alt="image" src="https://github.com/user-attachments/assets/63b9b003-c3ba-4db8-8822-a3c71f95e266" />


<img width="1919" height="1027" alt="image" src="https://github.com/user-attachments/assets/4a4a6df8-d4f4-47c0-866b-4192e0f0e2bf" />


## Employer Dashboard

<img width="1919" height="1029" alt="image" src="https://github.com/user-attachments/assets/e8648a80-67e3-4e60-a1a9-80f9470bcfb9" />


<img width="1913" height="1030" alt="image" src="https://github.com/user-attachments/assets/f962b063-bc03-453b-a6d7-37bf9a5f2088" />






##  Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/ShramSetu.git
cd ShramSetu

cd frontend
npm install
npm start

cd backend
npm install
npm run dev

### Environment Variables
Create a .env file inside your backend/ folder:
PORT=5000
MONGO_URI=your_mongodb_connection_string
FIREBASE_API_KEY=your_firebase_api_key
JWT_SECRET=your_secret_key

---

## API Endpoints (Sample)

| Method | Endpoint               | Description                         |
| ------ | ---------------------- | ----------------------------------- |
| `POST` | `/api/auth/register`   | Register new user (worker/employer) |
| `POST` | `/api/auth/login`      | Login user                          |
| `GET`  | `/api/jobs`            | Get all available jobs              |
| `POST` | `/api/jobs`            | Post a new job (Employer only)      |
| `PUT`  | `/api/jobs/:id/accept` | Accept a job (Worker only)          |
| `GET`  | `/api/users/:id`       | Get user profile                    |

---
###Vision

To empower local workers by providing accessible, tech-driven employment opportunities
and to make the hiring process seamless for small-scale employers.
---
### Contributing

We welcome contributions to make ShramSetu better!
To contribute:

Fork the repo

Create a new branch: git checkout -b feature-name

Make your changes

Commit and push

Open a Pull Request
##  Project Structure
ShramSetu/
│
├── frontend/                          # React frontend
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   │
│   ├── src/
│   │   ├── assets/                    # Images, icons, logos
│   │   ├── components/                # Reusable UI components (Navbar, Footer, etc.)
│   │   ├── pages/                     # Page components (Home, Login, Dashboard, etc.)
│   │   ├── context/                   # React Context (Auth, Job Context)
│   │   ├── services/                  # API call functions (Axios)
│   │   ├── App.js
│   │   └── index.js
│   │
│   ├── .env                           # Frontend environment variables (Firebase keys, API URL)
│   ├── package.json
│   ├── tailwind.config.js             # Tailwind CSS config (if used)
│   └── vite.config.js / webpack.config.js
│
├── backend/                           # Node.js backend
│   ├── src/
│   │   ├── config/                    # DB and Firebase config
│   │   │   ├── db.js
│   │   │   └── firebase.js
│   │   │
│   │   ├── controllers/               # Controller logic for routes
│   │   │   ├── authController.js
│   │   │   ├── jobController.js
│   │   │   └── userController.js
│   │   │
│   │   ├── models/                    # Mongoose models
│   │   │   ├── User.js
│   │   │   ├── Job.js
│   │   │   └── Application.js
│   │   │
│   │   ├── routes/                    # Express routes
│   │   │   ├── authRoutes.js
│   │   │   ├── jobRoutes.js
│   │   │   └── userRoutes.js
│   │   │
│   │   ├── middleware/                # Auth middleware (JWT/Firebase)
│   │   │   └── authMiddleware.js
│   │   │
│   │   ├── utils/                     # Helper functions
│   │   │   └── errorHandler.js
│   │   │
│   │   └── server.js                  # Entry point
│   │
│   ├── .env                           # Backend environment variables (Mongo URI, JWT secret, etc.)
│   ├── package.json
│   └── README.md
│
├── .gitignore
├── README.md
└── LICENSE


