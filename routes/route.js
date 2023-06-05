const express = require("express");
const app=express();
const router = express.Router();
const Expense= require("../model/ModelExp");
const Income=require("../model/ModelInc");
const Invest=require("../model/ModelInv");
const Profile=require("../model/ModelProf");
const {NseIndia}= require("stock-nse-india");
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));
  const {OAmt,CAmt,OAmt2,CAmt2,OAmt3,CAmt3,EAmt,EAmt2,EAmt3,IAmt,IAmt2,IAmt3,IDAmt,IDeAmt,Stock,Stockz, StockName,StockDet,incDel,expDel } = require("../Middleware/sum");

const alpha = require('alphavantage')({ key: 'VPT36YI266UJIBM7' });
const schedule= require('node-schedule');
////////income Data////////////////////////////////////////////
router.route("/income").post((req,res)=>{ //note making
	console.log(req.body);
	  const Username=req.body.User;
	  const Type=req.body.Type;
	  const Desc=req.body.Desc;
	  const Amt=req.body.Amt;
	  const today = new Date();
    const month = today.getMonth()+1;
    const year = today.getFullYear() ;

	  const newNote= new Income({
		Type: Type,
		Desc: Desc,
		Username: Username,
		Amt: Amt,
    Month: month,
    Year: year
	  });
	console.log(newNote);
	  newNote.save();




    Profile.updateOne({Username:Username}, {$inc:{ IncAmt: Amt}}, function (err, raw) {
      if (err) {
        res.status(500);
        res.send(err);
      } else {
        console.log(raw);
        res.status(200);
        res.send();
      }
    });

	});
  router.route("/upincome").post((req,res)=>{
    const Type=req.body.Type;
	  const Desc=req.body.Desc;
	  const Amt=req.body.Amt;
    const Date=req.body.Date;
    const id=req.body.id;
    console.log(id);
    Income.updateOne({"_id":id},{
      Type: Type,
      Desc: Desc,
      Amt: Amt
    }, function (err, raw) {
      if (err) {
        res.status(500);
        res.send(err);
      } else {
        console.log(raw);
        res.status(200);
        res.send();
      }
  });
});
  

  ////////////////////misc dream code ///////////////////////////////
  router.get("/investOri", OAmt);
  router.get("/investCha", CAmt);
  router.get("/investOri2", OAmt2);
  router.get("/investCha2", CAmt2);
  router.get("/investOri3", OAmt3);
  router.get("/investCha3", CAmt3);
  router.get("/api/expense",EAmt);
  router.get("/api/expense2",EAmt2);
  router.get("/api/expense3",EAmt3);
  router.get("/api/income",IAmt);
  router.get("/api/income2",IAmt2);
  router.get("/api/income3",IAmt3);
  router.get("/api/incomett",IDAmt);
 // router.get("/api/stock",Stockz);
  router.get("/api/stockzz",StockName);
  router.get("/rtkQ",StockDet);
  router.post("/api/expdel",expDel);
  router.post("/api/incdel",incDel);


    ////// EXPENSE DATA///////////////////////////////////////////////////////////////////////////////////

    router.route("/expense").post((req,res)=>{ //note making
        console.log(req.body);
          const Username=req.body.User;
          const Type=req.body.Type;
          const Desc=req.body.Desc;
          const Amt=req.body.Amt;
          const today = new Date();
          const month = today.getMonth()+1;
          const year = today.getFullYear() ;
          console.log(Username+",,,"+Type+",,,"+Desc+",,,"+Amt);
          const newExp= new Expense({
            Type: Type,
            Desc: Desc,
            Username: Username,
            Amt: Amt,
            Month: month,
            Year: year
          });
        console.log(newExp);
          newExp.save();

     
        })
        router.route("/upexpense").post((req,res)=>{
          const Type=req.body.Type;
          const Desc=req.body.Desc;
          const Amt=req.body.Amt;
          const id=req.body.id;
          console.log(id);
          Expense.updateOne({"_id":id},{
            Type: Type,
            Desc: Desc,
            Amt: Amt
          }, function (err, raw) {
            if (err) {
              res.status(500);
              res.send(err);
            } else {
              console.log(raw);
              res.status(200);
              res.send();
            }
        });
      });



        ////INvest///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        router.route("/invest").post((req,res)=>{
            console.log(req.body);
              const Username=req.body.User;
              const Name=req.body.Name;
              const Type=req.body.Type;
              const Desc=req.body.Desc;
              const Amt=req.body.Amt;
              const No=req.body.No;
              const Ca=Amt;
              const Ta=Amt*No;
              const CTa=Ta;
              const today = new Date();
              const month = today.getMonth()+1;
              const year = today.getFullYear() ;


              const newInv= new Invest({
                Type: Type,
                Desc: Desc,
                Username: Username,
                Amt: Amt,
                No: No,
                Name:Name,
                Ca:Ca,
                CTa:CTa,
                Ta:Ta,
                Month: month,
                Year: year
              });
            console.log(newInv);
              newInv.save();


              
            });
            //PROBLEM PROBLEM PROBLEM
            async function upDb()
            {
              const  nseIndia = new  NseIndia();
                var response= await fetch("http://localhost:8080/api/investtable");
                var data =await response.json();
                console.log(data);
                data.forEach((item, index) => {
                  const orders = nseIndia.getEquityDetails(item.Name).then(details  => {
                    console.log(item.Name);
                    console.log(details.priceInfo.lastPrice);
                    Invest.updateMany({Name:item.Name}, { $set: {Ca:details.priceInfo.lastPrice } }, function(err, res) {
                      if (err) throw err;
                      else{
                      console.log(res);
                      }
                    });
                  });
                    //res.json(details);
                });
              }
              schedule.scheduleJob('* 10 * * * *',()=>{
                upDb();
              });

              



              //////////////////// INVEST SELL /////////////////////////////////////////////
            router.post('/investSell', (req, res) => {

                      const message = req.body.Name;
                      const pos=message.indexOf(",");
                      const pos2=message.indexOf(".");
                      const pos3=message.indexOf("{");
                      const _id=message.slice(0,pos);
                      const Name=message.slice(pos+1,pos2);
                      const OAmt=message.slice(pos2+1,pos3);
                      const No=-req.body.No;
                      const Amt=req.body.Amt;
                      const User=req.body.User;
                      const gAmt=Amt*No;
                      const tAmt=OAmt*No;
                      const today = new Date();
                      const month = today.getMonth()+1;
                      const year = today.getFullYear() ;
                      console.log(_id+",,,"+Name+",,,"+OAmt);

                      ///MAKING CHANGES IN INVESTMENT TABLE
                      Invest.findByIdAndUpdate(_id, {$inc:{ No: No }}, function (err, inventory) {
                        if (err) {
                          res.status(500);
                          res.send(err);
                        } else {
                          res.status(200);
                          res.send();
                        }
                      });

                      ///MAKING RECORD IN INCOME TABLE
                      const newNote= new Income({
                        Type: Name+" share sell",
                        Desc: -No.toString(10) + " shares of "+Name+ " sold at Rs."+Amt.toString(10) +", bought at Rs."+OAmt ,
                        Username: User,
                        Amt: -gAmt,
                        Month: month,
                        Year: year
                        });
                        console.log(newNote);
                        newNote.save();


                     
              });




              //finding DATA for dropdownlist and Invest table///////////////////////////////
            router.route("/investtable").get((req,res)=>{

                    console.log(req.query.Username);
                    const name=req.query.Username;

                    Invest.find({Username:name})
                        .then(foundNotes =>res.json(foundNotes));

              });
              router.route("/investtable2").get((req,res)=>{

                console.log(req.query.Username);
                const name=req.query.Username;
                const type=req.query.Type;
                Invest.find({Username:name,Name:type})
                    .then(foundNotes =>res.json(foundNotes));

          });
              router.route("/api/investtable").get((req,res)=>{

                  Invest.find({},{
                    Name:"$Name",
                    Type:"$Type"
                  })
                    .then(foundNotes =>res.json(foundNotes));

          });




               // finding data for income table//////////////////////////////////////
              router.route("/incometable").get((req,res)=>{

                    console.log(req.query.Username);
                    const name=req.query.Username;

                    Income.find({Username:name})
                          .then(foundNotes => res.json(foundNotes));

              });
              router.route("/incometable2").get((req,res)=>{

                console.log(req.query.Username);
                const name=req.query.Username;
                const type=req.query.Type;

                Income.find({Username:name,Type:type})
                      .then(foundNotes => res.json(foundNotes));

          });

               // finding data for expense table//////////////////////////////////////
              router.route("/expensetable").get((req,res)=>{

                console.log(req.query.Username);
                const name=req.query.Username;

                Expense.find({Username:name})
                      .then(foundNotes => res.json(foundNotes));
          });
          router.route("/expensetable2").get((req,res)=>{

            console.log(req.query.Username);
            const name=req.query.Username;
            const type=req.query.Type;

            Expense.find({Username:name,Type:type})
                  .then(foundNotes => res.json(foundNotes));
      });


    module.exports = router;