const mongoose = require("mongoose");

const ProfileSchema = mongoose.Schema({
  Username:{
    type:String,
    required: true
  },
  IncAmt:{
    type: mongoose.Decimal128,
    default: 0
  },
  ExpAmt:{
    type: mongoose.Decimal128,
    default: 0
  },
  InvAmt:{
    type: mongoose.Decimal128,
    default: 0
  },
  CInvAmt:{
    type: mongoose.Decimal128,
    default: 0
  }
});

const Profile = mongoose.model("OfficialProf", ProfileSchema);

module.exports = Profile;