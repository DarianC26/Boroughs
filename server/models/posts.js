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
    },
    comm_name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    }
});

const PostModel = mongoose.model('posts', PostSchema);
module.exports = PostModel;