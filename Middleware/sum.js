const Invest=require("../model/ModelInv");
const Income=require("../model/ModelInc");
const Expense=require("../model/ModelExp");
//import { NseIndia } from  "stock-nse-india";
const {NseIndia}= require("stock-nse-india");
exports.OAmt = async (req, res, next) => {

    try {
        const orders = await Invest.aggregate(
          [
            {
              $match: {
                "Username": req.query.Username        
              }
          },
            {
              $group:
                {
                  _id: "$Username",
                  totalAmount: { $sum: { $multiply: [ "$Amt", "$No" ] } },
                  count: { $sum: 1 }
                }
            }
          ]
       )
        console.log(orders);
        res.status(200).json({
            success: true,            
            orders
        })
        next();
    } catch (error) {
        console.log(error);
    }
}
exports.OAmt2 = async (req, res, next) => {

  try {
      const orders = await Invest.aggregate(
        [
          {
            $match: {
              "Username": req.query.Username,
              "Name": req.query.Type,        
            }
        },
          {
            $group:
              {
                _id: "$Username",
                totalAmount: { $sum: { $multiply: [ "$Amt", "$No" ] } },
                count: { $sum: 1 }
              }
          }
        ]
     )
      console.log(orders);
      res.status(200).json({
          success: true,            
          orders
      })
      next();
  } catch (error) {
      console.log(error);
  }
}
exports.OAmt3 = async (req, res, next) => {

  try {
      const orders = await Invest.aggregate(
        [
          {
            $match: {
              "Username": req.query.Username,
              "createdAt": {
                "$lte": new Date(req.query.Date)
              }        
            }
        },
          {
            $group:
              {
                _id: "$Username",
                totalAmount: { $sum: { $multiply: [ "$Amt", "$No" ] } },
                count: { $sum: 1 }
              }
          }
        ]
     )
      console.log(orders);
      res.status(200).json({
          success: true,            
          orders
      })
      next();
  } catch (error) {
      console.log(error);
  }
}


exports.CAmt = async (req, res, next) => {

  try {
      const orders = await Invest.aggregate(
        [
          {
            $match: {
              "Username": req.query.Username        
            }
        },
          {
            $group:
              {
                _id: "$Username",
                totalAmount: { $sum: { $multiply: [ "$Ca", "$No" ] } },
                count: { $sum: 1 }
              }
          }
        ]
     )
      console.log(orders);
      res.status(200).json({        
          orders
      })
      next();
  } catch (error) {
      console.log(error);
  }
}
exports.CAmt2 = async (req, res, next) => {

  try {
      const orders = await Invest.aggregate(
        [
          {
            $match: {
              "Username": req.query.Username ,
              "Name": req.query.Type,      
            }
        },
          {
            $group:
              {
                _id: "$Username",
                totalAmount: { $sum: { $multiply: [ "$Ca", "$No" ] } },
                count: { $sum: 1 }
              }
          }
        ]
     )
      console.log(orders);
      res.status(200).json({        
          orders
      })
      next();
  } catch (error) {
      console.log(error);
  }
}

exports.CAmt3 = async (req, res, next) => {

  try {
      const orders = await Invest.aggregate(
        [
          {
            $match: {
              "Username": req.query.Username ,
              "createdAt": {
                "$lte": new Date(req.query.Date)
              }      
            }
        },
          {
            $group:
              {
                _id: "$Username",
                totalAmount: { $sum: { $multiply: [ "$Ca", "$No" ] } },
                count: { $sum: 1 }
              }
          }
        ]
     )
      console.log(orders);
      res.status(200).json({        
          orders
      })
      next();
  } catch (error) {
      console.log(error);
  }
}

exports.EAmt = async (req, res, next) => {

  try {
      const orders = await Expense.aggregate(
        [
          {
            $match: {
              "Username": req.query.Username        
            }
        },
          {
            $group:
              {
                _id: "$Username",
                totalAmount: { $sum: "$Amt" },
                count: { $sum: 1 }
              }
          }
        ]
     )
      //console.log(orders);
      res.status(200).json({     
          orders
      })
      next();
  } catch (error) {
      console.log(error);
  }
}
exports.EAmt2 = async (req, res, next) => {

  try {
      const orders = await Expense.aggregate(
        [
          {
            $match: {
              "Username": req.query.Username,
              "Type": req.query.Type,        
            }
        },
          {
            $group:
              {
                _id: "$Username",
                totalAmount: { $sum: "$Amt" },
                count: { $sum: 1 }
              }
          }
        ]
     )
      //console.log(orders);
      res.status(200).json({     
          orders
      })
      next();
  } catch (error) {
      console.log(error);
  }
}
exports.EAmt3 = async (req, res, next) => {

  try {
      const orders = await Expense.aggregate(
        [
          {
            $match: {
              "Username": req.query.Username,
              "createdAt": {
                "$lte": new Date(req.query.Date)
              }       
            }
        },
          {
            $group:
              {
                _id: "$Username",
                totalAmount: { $sum: "$Amt" },
                count: { $sum: 1 }
              }
          }
        ]
     )
      //console.log(orders);
      res.status(200).json({     
          orders
      })
      next();
  } catch (error) {
      console.log(error);
  }
}

exports.IAmt = async (req, res, next) => {

  try {
      const orders = await Income.aggregate(
        [
          {
            $match: {
              "Username": req.query.Username        
            }
        },
          {
            $group:
              {
                _id: "$Username",
                totalAmount: { $sum: "$Amt" },
                count: { $sum: 1 }
              }
          }
        ]
     )
      //console.log(orders);
      res.status(200).json({         
          orders
      })
      next();
  } catch (error) {
      console.log(error);
  }
}

exports.IAmt2 = async (req, res, next) => {

  try {
      const orders = await Income.aggregate(
        [
          {
            $match: {
              "Username": req.query.Username ,
              "Type": req.query.Type       
            }
        },
          {
            $group:
              {
                _id: "$Username",
                totalAmount: { $sum: "$Amt" },
                count: { $sum: 1 }
              }
          }
        ]
     )
      //console.log(orders);
      res.status(200).json({         
          orders
      })
      next();
  } catch (error) {
      console.log(error);
  }
}

exports.IAmt3 = async (req, res, next) => {
  try {
    const orders = await Income.aggregate(
      [
        {
          $match: {
            "Username": req.query.Username ,
            "createdAt": {
              "$lte": new Date(req.query.Date)
            }    
          }
      },
        {
          $group:
            {
              _id: "$Username",
              totalAmount: { $sum: "$Amt" },
              count: { $sum: 1 }
            }
        }
      ]
   )
    //console.log(orders);
    res.status(200).json({         
        orders
    })
    next();
} catch (error) {
    console.log(error);
}
}

exports.IDAmt = async (req, res, next) => {

  try {
      const orders = await Income.aggregate(
        [
          {
            $match: {
              "Username": req.query.Username        
            }
        },
          {
            $group:
              {
                _id:{ Month: "$Month", Year: "$Year" },
                totalAmount: { $sum: "$Amt" },
                count: { $sum: 1 }
              }
          }
        ]
     )
      //console.log(orders);
      res.status(200).json({     
          orders
      })
      next();
  } catch (error) {
      console.log(error);
  }
}



exports.IDeAmt = async (req, res, next) => {

  try {
      const orders = await Invest.find(
        [
          {
            
          },
          {
            Name:"$Name",Type:"$Type"
          }
        ]
     )
      //console.log(orders);
      res.status(200).json({     
          orders
      })
      next();
  } catch (error) {
      console.log(error);
  }
}


exports.Stock = async (req, res, next) => {

  try {
      const orders = await req.query.Name;

      var today = new Date();
          var date=today.getDate()-4;
          date=(date<1)?1:date;
          var month=today.getMonth();
          var year=today.getFullYear();
          
          var st=(date<10)?year.toString()+"-"+month.toString()+"-0"+date.toString():year.toString()+"-"+month.toString()+"-"+date.toString();
          const urldd="https://api.polygon.io/v2/aggs/ticker/"+item.Name+"/range/1/day/"+st+"/"+st+"?adjusted=true&sort=asc&limit=120&apiKey=v3bGcVCqLsdx3bmYTDy6uhPrHae_mh5h";
          const response=await fetch(urldd);
                const data = await response.json();
                const tick= await data.results;
                // const ticker=await (tick)? tick[0]:0;
                // const resp=await ticker.o;
                console.log("Lets start");
                console.log(tick);
                // console.log(ticker);
                // console.log(resp);
  }
                catch (error) {
                  console.log(error);
              }
            }

            exports.StockName = async (req, res, next) => {
              
              try {
                
                const  nseIndia = new  NseIndia()
                // To get all symbols from NSE
                const orders =await nseIndia.getAllStockSymbols().then(symbols  => {
                //console.log(symbols);
                
                res.json(symbols);
                })
              //   res.status(200).json({     
              //     orders
              // })
              next();
              }
              catch (error) {
                console.log(error);
            }
          }
          exports.StockDet = async (req, res, next) => {
            try {
              const  nseIndia = new  NseIndia();
              // To get all symbols from NSE
              const Name=req.query.Name;
              console.log(Name);
              const orders =await nseIndia.getEquityDetails(Name).then(details  => {
                console.log(details);
                res.json(details);
                });
             
            }
            catch (error) {
              console.log(error);
          }
        }
        exports.StockDeta = async (req, res, next) => {
          try {
            const  nseIndia = new  NseIndia();
            // To get all symbols from NSE
            const Name=req.query.Name;
            console.log(Name);
            const orders =nseIndia.getEquityDetails(Name).then(details  => {
              console.log(details.metadata);
              res.json(details.metadata);
              });
           
          }
          catch (error) {
            console.log(error);
        }
      }
      exports.incDel = async (req, res, next) => {
        console.log(req.body._id);
        try {
            const orders = await Income.deleteOne(  
                    {
                        "_id": req.body._id              
                    }
            );
            console.log(orders);
            res.status(200).json({     
                orders
            });
    
            //Blog.find({}).then(foundNotes =>res.json(foundNotes));
            next();
        } 
        catch (error) {
            console.log(error);
        }
    }
    exports.expDel = async (req, res, next) => {
      console.log(req.body._id);
      try {
          const orders = await Expense.deleteOne(  
                  {
                      "_id": req.body._id              
                  }
          );
          console.log(orders);
          res.status(200).json({     
              orders
          });
  
          //Blog.find({}).then(foundNotes =>res.json(foundNotes));
          next();
      } 
      catch (error) {
          console.log(error);
      }
  }