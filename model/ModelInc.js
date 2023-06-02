const mongoose = require("mongoose");

const IncomeSchema = mongoose.Schema({
  Username:{
    type:String,
    required: true
  },
  Type:{
    type:String,
    required: true
  },
  Desc:{
    type: String
  },
  Amt:{
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

const Income = mongoose.model("OfficialIncome", IncomeSchema);

module.exports = Income;
