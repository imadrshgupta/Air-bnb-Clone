const { check, validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcryptjs");


exports.getLogin =  (req, res, next)=>{
  res.render('auth/login', { 
    pageTitle: 'Login',
    currentPage: 'login',
    isLoggedIn: false,
    oldInput: {email: ""},
    errors: [],
    user: {},
  });
 };

 exports.getSignup =  (req, res, next)=>{
  res.render('auth/signup', { 
    pageTitle: 'Signup',
    currentPage: 'signup',
    isLoggedIn: false,
    errors : [] ,
    oldInput: {firstName: "", lastName: "", email: "", userType: ""},
    user: {},
  });
 };

  exports.postSignup = [

  check("firstName")
  .trim()
  .isLength({min: 2})
  .withMessage("First Name should be atleast 2 character long ")
  .matches(/^[A-Za-z\s]+$/)
  .withMessage("First Name should contain only alphabets"),
  
  check("lastName")
  .matches(/^[A-Za-z\s]*$/)
  .withMessage("last name should contain only alphebet"),

  check("email")
  .isEmail()
  .withMessage("please enter a valid email")
  .normalizeEmail(),

  check("password")
  .isLength({min: 8})
  .withMessage("Password should contain atleast 8 character long")
  .matches(/[A-Z]/)
  .withMessage("Password should contain atleast one uppercase")
  .matches(/[a-z]/)
  .withMessage("password should contain at leasty one lowercase")
  .matches(/[0-9]/)
  .withMessage("password should contain atleast one number")
  .matches(/[!@&]/)
  .withMessage("Password should contain atleast one special character")
  .trim(),

  check("confirmPassword")
  .trim()
  .custom((value, { req }) => {
    if(value !== req.body.password) {
      throw new Error("Password do  not match");
    }
    return true;
  }),

  check("userType")
  .notEmpty()
  .withMessage("Please select a user type")
  .isIn(['guest', 'host'])
  .withMessage("Invalid user type"),

  check("terms")
  .custom((value, { req }) => {
    if (value !== "on") {
      throw new Error("Please accept the terms and condition")
    }
    return true;
  }),


  (req, res, next ) => {
  const {firstName, lastName, email, password, userType} = req.body;
  const errors = validationResult(req);
  if(!errors.isEmpty()){
  return res.status(422).render("auth/signup",{ 
    pageTitle: "Signup",
    currentPage: "signup",
    isLoggedIn: false,
    errors: errors.array().map(err => err.msg),
    oldInput: {firstName, lastName, email, password, userType},
    user: {},
    
  });
 }
  
bcrypt.hash(password, 12)
.then(hashedPassword => {
 const user = new User({firstName, lastName, email, password: hashedPassword, userType});
  return user.save();
}).then(() => {
  res.redirect("/login");
 }).catch(err => {
   return res.status(422).render("auth/signup",{
    pageTitle: "Signup",
    currentPage: "signup",
    isLoggedIn: false,
    errors: [err.message],
    oldInput: {firstName, lastName, email, userType},
    user: {},
   });
 }); 
 }];


 exports.postLogin = async (req, res, next ) => {
 const{email, password} = req.body;
 const user = await User.findOne({email});
 if (!user) {
  return res.status(422).render("auth/login", {
    pageTitle: "Login",
    currentPage: "Login",
    isLoggedIn: false,
    errors: ["user does not exist"],
    oldInput: {email},
    user: {},
  });
 }

 const isMatch = await bcrypt.compare(password, user.password);
  if(!isMatch) {
   return res.status(422).render("auth/login",{
    pageTitle: "Login",
    currentPage: false,
    isLoggedIn: false,
    errors: ["Invalid password"],
    oldInput: {email},
    user: {},
   });
  }
  req.session.isLoggedIn = true;
  req.session.user = user;
  await req.session.save();
  res.redirect("/");
 }


 exports.postLogout = (req, res, next) =>{
  req.session.destroy(()=>{
     res.redirect("/login");
  })
 } 
 
 