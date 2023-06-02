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
  const {OAmt,CAmt,EAmt,IAmt,IDAmt,IDeAmt,Stock,Stockz, StockName,StockDet } = require("../Middleware/sum");

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



  ////////////////////misc dream code ///////////////////////////////
  router.get("/investOri", OAmt);
  router.get("/investCha", CAmt);
  router.get("/api/expense",EAmt);
  router.get("/api/income",IAmt);
  router.get("/api/incomett",IDAmt);
 // router.get("/api/stock",Stockz);
  router.get("/api/stockzz",StockName);
  router.get("/rtkQ",StockDet);

  // async function getISS(){
  //       var response= await fetch("http://localhost:8080/api/investtable");
  //       var data =await response.json();
  //       console.log(data);
  //       data.forEach((item, index) => {
  //         console.log(`${index} : ${item.Name}`)
  //         var today = new Date();
  //         var date=today.getDate()-4;
  //         date=(date<1)?1:date;
  //         var month=today.getMonth();
  //         var year=today.getFullYear();

  //         var st=(date<10)?year.toString()+"-"+month.toString()+"-0"+date.toString():year.toString()+"-"+month.toString()+"-"+date.toString();
  //         console.log(st);
  //         if (item.Type==="Stock")
  //         {
  //            const url="https://api.polygon.io/v2/aggs/ticker/"+item.Name+"/range/1/day/"+st+"/"+st+"?adjusted=true&sort=asc&limit=120&apiKey=v3bGcVCqLsdx3bmYTDy6uhPrHae_mh5h"
  //            getD(url,item.Name);
  //         }
  //         else if(item.Type==="Crypto")
  //         {
  //           const url="https://api.polygon.io/v2/aggs/ticker/"+item.Name+"/range/1/day/"+st+"/"+st+"?adjusted=true&sort=asc&limit=120&apiKey=v3bGcVCqLsdx3bmYTDy6uhPrHae_mh5h"
  //           getD(url,item.Name);
  //         }
  //         else if(item.Type==="Forex")
  //         {
  //           const url="https://api.polygon.io/v2/aggs/ticker/"+item.Name+"/range/1/day/"+st+"/"+st+"?adjusted=true&sort=asc&limit=120&apiKey=v3bGcVCqLsdx3bmYTDy6uhPrHae_mh5h"
  //           getD(url,item.Name);
  //         }
  //         else if(item.Type==="Option")
  //         {
  //           const url="https://api.polygon.io/v2/aggs/ticker/"+item.Name+"/range/1/day/"+st+"/"+st+"?adjusted=true&sort=asc&limit=120&apiKey=v3bGcVCqLsdx3bmYTDy6uhPrHae_mh5h"
  //           getD(url,item.Name);
  //         }
  //         else
  //         {
  //           const url="https://api.polygon.io/v2/aggs/ticker/"+item.Name+"/range/1/day/"+st+"/"+st+"?adjusted=true&sort=asc&limit=120&apiKey=v3bGcVCqLsdx3bmYTDy6uhPrHae_mh5h"
  //           getD(url,item.Name);
  //         }
  //       })
  // }
  // async function getD(urldd,name)
  // {
  //       const response=await fetch(urldd);
  //       const data = await response.json();
  //       const tick= await data.results;
  //       const ticker=await (tick)? tick[0]:0;
  //       const resp=await ticker.o;
  //       console.log("Lets start");
  //       console.log(tick);
  //       console.log(ticker);
  //       console.log(resp);

  //       //Profile.updateOne({Name:name}, {$set:{ Ca: resp }},{acknowledged:true});
  //       if (resp)
  //       {
  //              Invest.updateMany({Name:name}, { $set: {Ca: resp*82} }, function(err, res) {
  //               if (err) throw err;
  //               else{
  //               console.log(res);
  //               }
  //             });
  //       }
  // }


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

          /////UPDATING THE PROFILE DB ///////////////////////////////////////
          // Profile.updateOne({Username:Username}, {$inc:{ IncAmt: -Amt, ExpAmt:Amt }}, function (err, raw) {
          //   if (err) {
          //     res.status(500);
          //     res.send(err);
          //   } else {
          //     console.log(raw);
          //     res.status(200);
          //     res.send();
          //   }
          // });
        })



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



          //      // finding data for amounts table//////////////////////////////////////
          //      router.route("/proftable").get((req,res)=>{

          //       console.log(req.query.Username);
          //       const name=req.query.Username;

          //       Profile.find({Username:name})
          //             .then(foundNotes => res.json(foundNotes));

          // });



               // finding data for expense table//////////////////////////////////////
              router.route("/expensetable").get((req,res)=>{

                console.log(req.query.Username);
                const name=req.query.Username;

                Expense.find({Username:name})
                      .then(foundNotes => res.json(foundNotes));
          });


    module.exports = router;