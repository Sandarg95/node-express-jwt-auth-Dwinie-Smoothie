const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://dsantana15:kezQJOjLKcCjJ0Mf@nodetest.pciif.mongodb.net';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('*', checkUser); // for every single route
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.use(authRoutes);

// // cookies
// app.get('/set-cookie', (req, res) => {
//   // res.setHeader('set-cookie', 'newUser=true');

//   res.cookie('isEmployee', true, { maxAge:1000 * 60 * 60 * 24, httpOnly:true});

//   res.send('You got the cookies');

// });

// app.get('/read-cookie', (req, res) => {
//   const cookies = req.cookies;
//   console.log(cookies.newUser);

//   res.json(cookies);
// });

