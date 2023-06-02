const mongoose = require("mongoose");

const InvestSchema = mongoose.Schema({
  Username:{
    type:String,
    required: true
  },
  Name:{
    type:String,
    required: true
  },
  Type:{
    type:String,
    default:"Stock"
  },
  Desc:{
    type: String
  },
  No:{
    type: mongoose.Decimal128,
    required: true
  },
  Amt:{
    type: mongoose.Decimal128,
    required: true
  },
  Ca:{
    type: mongoose.Decimal128,
    required: true
  },
  Ta:{
    type: mongoose.Decimal128,
    required: true
  },
  CTa:{
    type: mongoose.Decimal128,
    required: true
  },
  Month:{
    type: mongoose.Decimal128,
    required: true
  },
  Year:{
    type: mongoose.Decimal128,
    required: true
  },
},
  { timestamps: true }
);

const Invest = mongoose.model("OfficialInvest", InvestSchema);

module.exports = Invest;
