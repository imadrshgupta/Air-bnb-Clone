 # 🏡 Airbnb Clone (Node.js + Express + MongoDB + EJS + Tailwind)

A fully functional Airbnb-style web application built with Express.js, MongoDB, and EJS templating.  
This project includes user authentication, session-based login, property hosting pages, store/listing functionality, and protected routes.  
The UI is styled using TailwindCSS with a live rebuild setup.

---

## ⭐ Features

### 🔐 Authentication
- User Signup & Login
- Password hashing using **bcryptjs**
- Session-based authentication (Express Session + connect-mongodb-session)
- Auto-login preservation using MongoDB-backed sessions

### 🏠 Property Hosting (Host Panel)
- Protected `/host/*` routes  
- Only logged-in users can access host dashboard  
- Add, manage, and view hosted properties

### 🛒 Store / Listings
- Store routes for exploring properties
- Dynamic pages rendered using EJS

### 💻 UI & Frontend
- EJS templating engine
- TailwindCSS v3 for styling
- Live Tailwind watch script (`npm run tailwind`)

### 🗂 Folder Structure (MVC Architecture)
/controller
├── authController.js
├── error.js
├── hostController.js
└── storeController.js

/models
├── home.js
└── user.js

/routes
├── authRouter.js
├── hostRouter.js
└── storeRouter.js

/views
├── auth/
├── host/
├── store/
├── partials/
└── 404.ejs

/public
├── images/
└── output.css

/utils
└── pathUtil.js


---

## 🚀 Tech Stack

### **Backend**
- Node.js
- Express.js
- Mongoose (MongoDB ORM)
- express-session
- connect-mongodb-session

### **Frontend**
- EJS templating
- TailwindCSS (build using CLI)

### **Database**
- MongoDB Atlas

### **Security**
- bcryptjs for password hashing

---

2️⃣ Install dependencies
npm install

## **🧪 Available Scripts**
Start development server (Nodemon + Tailwind watcher)
npm run dev


This runs:

nodemon app.js (backend)

Tailwind watcher (tailwindcss -i ./views/input.css -o ./public/output.css --watch)

## **Start Tailwind manually**
npm run tailwind

## 🏗 How It Works (Brief Architecture Overview)

# 🔸 Session Handling

Sessions stored in MongoDB using connect-mongodb-session

Accessible across routes using req.session

Auto injects req.isLoggedIn for auth-based UI rendering

# 🔸 Route Protection

Middleware ensures only logged-in users can access host features:

app.use("/host", (req, res, next) => {
  if (req.isLoggedIn) next();
  else res.redirect("/login");
});

# 🔸 Static Files
app.use(express.static(path.join(rootDir, "public")));

 ## 🧭 Running the App

After installing dependencies and setting up .env, run:

npm run dev


 # Then open:

👉 http://localhost:3000/
🐞 Error Handling

A global error controller handles:

404 pages

unexpected server errors

 # Located in:

/controller/error.js

## 🪪 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Your Name ADARSH GUPTA
Airbnb Clone with Express & MongoDB
Feel free to contribute or open issues!


---

# Want a fully polished README with screenshots, emojis, badges & deployment instructions?

Just say **"make it advanced"** and I’ll upgrade this to a premium-quality README used in professional portfolios.

If you want deployment steps for **Render / Railway / Vercel**, tell me your choice and I will generate the full guide.



