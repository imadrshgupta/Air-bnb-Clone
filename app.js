  // core modules 
 const path = require('path');

 //external module
 const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const DB_PATH = "mongodb+srv://root:root@completecoding.ma2bun5.mongodb.net/airbnb?retryWrites=true&w=majority&appName=CompleteCoding";




 //local module
 const storeRouter = require("./routes/storeRouter");
 const hostRouter = require("./routes/hostRouter");
 const authRouter = require("./routes/authRouter");
 const rootDir = require("./utils/pathUtil");
 const errorController = require('./controller/error');
const { default: mongoose } = require('mongoose');


const app = express();


 app.set('view engine', 'ejs');
 app.set('views', 'views');

 const store = new MongoDBStore({
  uri: DB_PATH,
  collection: 'sessions'
 })

 app.use(express.urlencoded({ extended: true}));  
 app.use(session({
  secret: " knowledge gate with ai",
  resave: false,
  saveUninitialized: true,
  store : store
 }));


 app.use((req,res,next) => {
  req.isLoggedIn = req.session.isLoggedIn;
  next();
 });

 app.use(authRouter)
 app.use(storeRouter);
 app.use("/host", (req, res, next)=>{
  if(req.isLoggedIn){
    next();
  }else{
   res.redirect("/login");
  }
 });

 app.use("/host", hostRouter);

app.use(express.static(path.join(rootDir, 'public')));


 app.use(errorController.useError);

 const PORT = 3000; 

 mongoose.connect(DB_PATH).then(() => {
  console.log('Connected to mongo');
  app.listen(PORT, () =>{
  console.log(`server running at http://localhost:${PORT}`);
  
 });
 }).catch(err => {
  console.log('Error while connecting to mongo:', err);
 })