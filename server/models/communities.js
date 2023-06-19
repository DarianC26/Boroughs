const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    poster: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
});

const CommunitySchema = new mongoose.Schema({
  comm_name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  posts: [PostSchema]
});

const CommunityModel = mongoose.model('communities', CommunitySchema);
const PostModel = mongoose.model('communities', CommunitySchema);
module.exports = CommunityModel;
module.exports = PostModel;