const mongoose = require("mongoose");

const FriendsSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  friends: [{
    fStatus : Number, //0 pending, 1 following, 2 friends (Note: Maybe use enums?)
    username : String
    }]
});

const FriendsModel = mongoose.model('friends', FriendsSchema);
module.exports = FriendsModel;
