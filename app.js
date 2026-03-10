 require('dotenv').config();
  
  // core modules 
 const path = require('path');

 //external module
 const express = require('express');
 const pool = require("./config/database");
 const cors = require("cors");
 const PORT = process.env.PORT || 4000; 
 const app = express(); 
// const session = require('express-session');
// const MongoDBStore = require('connect-mongodb-session')(session);
// const DB_PATH = "mongodb+srv://root:root@copmpletecoding.ma2bun5.mongodb.net/?appName=CopmpleteCoding";
// //"mongodb+srv://root:root@completecoding.ma2bun5.mongodb.net/airbnb?retryWrites=true&w=majority&appName=CompleteCoding";




//  //local module
//  const storeRouter = require("./routes/storeRouter");
//  const hostRouter = require("./routes/hostRouter");
//  const authRouter = require("./routes/authRouter");
//  const rootDir = require("./utils/pathUtil");
//  const errorController = require('./controller/error');
// const { default: mongoose } = require('mongoose');

//  app.set('view engine', 'ejs');
//  app.set('views', 'views');

//  const store = new MongoDBStore({
//   uri: DB_PATH,
//   collection: 'sessions'
//  })

 app.use(express.urlencoded({ extended: true})); 
 app.use(express.json());
 app.use(cors()); 

//  app.use(session({
//   secret: " knowledge gate with ai",
//   resave: false,
//   saveUninitialized: true,
//   store : store
//  }));


//  app.use((req,res,next) => {
//   req.isLoggedIn = req.session.isLoggedIn;
//   next();
//  });

//  app.use(authRouter)
//  app.use(storeRouter);
//  app.use("/host", (req, res, next)=>{
//   if(req.isLoggedIn){
//     next();
//   }else{
//    res.redirect("/login");
//   }
//  });

//  app.use("/host", hostRouter);

// app.use(express.static(path.join(rootDir, 'public')));


//  app.use(errorController.useError);

// TESTING Pg Connection
app.get("/", async (req, res) => {
    const result = await pool.query("SELECT current_database()");
    console.log("end");
    res.send(`The db name is : ${ result.rows[0].current_database}`)
})

 app.listen(PORT, () =>{
 console.log(`server running at http://localhost:${PORT}`);
 
});
