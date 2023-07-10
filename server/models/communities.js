const mongoose = require("mongoose");

const CommunitySchema = new mongoose.Schema({
  comm_create: {
    type: String,
    required: true,
  },
  posts: {
    type: Array,
    required: true
  },
  comm_lower: {
    type: String
  }
});

const CommunityModel = mongoose.model('communities', CommunitySchema);
module.exports = CommunityModel;
