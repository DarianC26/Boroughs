const mongoose = require("mongoose");

const CommunitySchema = new mongoose.Schema({
  comm_name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  posts: {
    type: Array,
    required: true
  }
});

const CommunityModel = mongoose.model('communities', CommunitySchema);
module.exports = CommunityModel;
