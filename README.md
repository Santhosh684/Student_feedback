Student Feedback App

A full-stack web application for managing **course feedback**.  
Built with **Node.js + Express + MongoDB** (backend) and **React + Vite** (frontend).

---

##  Features

###  Authentication & Authorization
- Signup/Login with email and password
- Passwords hashed with **bcrypt**
- **JWT-based** authentication
- **Role-based access**: Student / Admin

### Feedback Module
**Students can:**
- Submit feedback on courses (rating 1–5 + message)
- View, edit, and delete their feedback  

**Admins can:**
- View all feedback
- Filter by course or rating
- Export feedback data to CSV

### Profile
- View and update profile information (Name, Phone, DOB, Address)
- Email is read-only
- (Optional: Upload profile picture to Cloudinary)

###  Admin Dashboard
- Overview of total feedback count and number of students
- Average ratings per course
- Manage students (block/unblock/delete)
- Manage courses (add/edit/delete)

---

##  Tech Stack

**Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcrypt  
**Frontend:** React (Vite), Axios, React Router  
**Other:** CSV export, dotenv, CORS

---

##  Getting Started

### Clone the repository
```bash
git clone https://github.com/Santhosh684/Student_feedback/new/new_branch

````

---

### Backend Setup

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

#### Example `.env` file:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/student_feedback_app
JWT_SECRET=supersecret
```

#### Seed the Database

```bash
node utils/seed.js
```

This will create:

* **Admin user**
* Sample courses

#### Admin Credentials

```
Email: admin@example.com
Password: Admin@1234
```

---

### Frontend Setup

```bash
cd ../frontend
npm install
npm install axios react-router-dom
```

#### Environment variables

Create `.env` in `frontend/`:

```env
VITE_API_URL=http://localhost:5000/api
```

#### Start frontend

```bash
npm run dev
```

The app will run at: [http://localhost:5173](http://localhost:5173)

---

## 🧪 Test Accounts

**Admin**

* Email: [admin@example.com](mailto:admin@example.com)
* Password: Admin\@1234

**Student**

* Sign up via frontend `/signup` page

---

## 📂 Project Structure

### Backend

```
backend/
├── config/        # Database connection
├── models/        # Mongoose schemas
├── routes/        # Express routes (auth, feedback, courses, admin)
├── middleware/    # JWT authentication & RBAC
├── utils/         # Seeder script
└── server.js      # Express entry point
```

### Frontend

```
frontend/
├── src/
│   ├── pages/     # Signup, Login, Dashboard , AdminDashboard, Profile, Admin
│   ├── api.js     # Axios wrapper
│   ├── App.jsx
│   └── main.jsx
└── vite.config.js # Vite config
```

---

## 🌍 Deployment

**Backend**

* Deploy on **Render / Railway / Heroku**
* Set environment variables from `.env`

**Frontend**

* Deploy on **Vercel / Netlify**
* Set `VITE_API_URL` to point to your backend’s deployed URL

---

## ✅ Roadmap / Future Extensions

* Profile picture upload (Cloudinary)
* Better feedback analytics with graphs
* Email notifications for feedback
* Unit and integration tests

---

```

---

I can also **write a GitHub-ready `.env.example` and seed script instructions** in this README so anyone can run the project immediately.  

Do you want me to do that next?
```
