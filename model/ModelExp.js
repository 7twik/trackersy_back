const mongoose = require("mongoose");

const ExpenseSchema = mongoose.Schema({
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
    type: mongoose.Decimal128
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

const Expense = mongoose.model("OfficialExpense", ExpenseSchema);

module.exports = Expense;