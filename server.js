require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const authRoute = require("./routes/auth");
const cookieSession = require("cookie-session");
const passportStrategy = require("./passport");
const app = express();
const bp = require('body-parser')
const routes=require("./routes/route");
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://7twik:zKqW0UzgQO3G3iMy@cluster0.sjxr9uv.mongodb.net/Trackersy" ,()=> console.log("connected to db"));
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.use(
	cookieSession({
		name: "session",
		keys: ["cyberwolve"],
		maxAge: 24 * 60 * 60 * 100,
	})
);

app.use(passport.initialize());
app.use(passport.session());

const corsOpts = {
	origin: '*',
  
	methods: [
	  'GET',
	  'POST',
	],
  
	allowedHeaders: [
	  'Content-Type',
	],
  };
  
  app.use(cors(corsOpts));
  
//  app.use(cors()); //and this

// app.get('/user/:id', function (req, res, next) {
//   res.json({user: 'CORS enabled'})
// })
app.use("/auth", authRoute);
app.use("",routes);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listenting on port ${port}...`));