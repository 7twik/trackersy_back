const router = require("express").Router();
const passport = require("passport");
const Expense= require("../model/ModelExp");
const Income=require("../model/ModelInc");
const Invest=require("../model/ModelInv");
const Profile=require("../model/ModelProf");

router.get("/login/success", (req, res) => {
	if (req.user) {
		// Profile.findOneAndUpdate(
		// 	{
		// 	  Username : req.user.emails[0].value
		// 	}, 
		// 	 {
		// 	  $setOnInsert: {Username: req.user.emails[0].value, InvAmt: 0, IncAmt: 0, ExpAmt: 0, CInvAmt: 0}
		// 	 },
		// 	 {upsert: true},
		// 	 function(err,raw){
		// 		if(err)
		// 		{
		// 			console.log(err);
		// 		}
		// 		else
		// 		{
		// 			//console.log(raw);
		// 		}
		// 	 });
		//console.log(req.user.emails[0].value);
		res.status(200).json({
			error: false,
			message: "Successfully Loged In",
			user: req.user,
			
		});
	} else {
		res.status(403).json({ error: true, message: "Not Authorized" });
	}
});

router.get("/login/failed", (req, res) => {
	res.status(401).json({
		error: true,
		message: "Log in failure",
	});
});

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get(
	"/google/callback",
	passport.authenticate("google",{
		successRedirect: process.env.CLIENT_URL,
		failureRedirect: "/login/failed",
	})
);

router.get("/logout", (req, res) => {
	req.logout();
	res.redirect(process.env.CLIENT_URL);
});



////////income Data
router.route("/api/income").post((req,res)=>{ //note making
	console.log(req.body);
	  const Username=req.body.User;
	  const Type=req.body.Type;
	  const Desc=req.body.Desc;
	  const Amt=req.body.Amt;
	  console.log(req.body);
	  //console.log("from route"+ Username+" ,,, "+ Type+"  ,,,,  "+Desc+"    ,,,   "+ Amt);
	  
	  const newNote= new Note({
		Type: Type,
		Desc: Desc,
		Username: Username,
		Amt: Amt
	  });
	
	  //Income.save();
	  
	})



module.exports = router;