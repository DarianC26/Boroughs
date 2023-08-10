const express = require('express');
const app = express();
const mongoose = require('mongoose');
const UserModel = require("./models/user.js");
const CommunityModel = require("./models/communities.js");
const PostModel = require("./models/posts.js");
const FriendsModel = require("./models/friends.js");

require('dotenv/config');

const cors = require("cors");

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.DB_CONNECTION)
    .then(() => console.log('Connected Successfully'))
    .catch(() => console.log('Connected Unsuccessfully'));

// The application's CRUD operations

// C operations

// Creates the user by taking in a username and email, fails if username and email is in use already
app.post('/createUser', async (req, res) => {
    const user = req.body;
    try {
        const dupUser = await UserModel.findOne({ username: req.body.username });
        const dupEmail = await UserModel.findOne({ email: req.body.email });
        if ((dupUser != null)) {
            res.status(400).json({ error: "This Username is already in use" });
        }
        else if (dupEmail != null) {
            res.status(400).json({ error: "This Email is already in use" });
        }
        else {
            const newUser = new UserModel(user);
            await newUser.save();
            res.send(newUser);
        }
    }
    catch (error) {
        res.status(400).json({ error });
    }
});

// Creates a post and assigns to the appropriate community in seperate collection
app.post('/createPost', async (req, res) => {
    let post = req.body;
    post.date = new Date();

    postLower = post.comm_name.toLowerCase();
  
    const community = await CommunityModel.findOne({ comm_lower: postLower });
    if (community) {
        post.comm_name = community.comm_create;
        const newPost = new PostModel(post);
        community.posts.unshift(newPost._id);
        await community.save();
        await newPost.save();
        res.json(newPost);
    }
});

// Creates a community, and sends an error if community name is already in use
app.post('/createCommunity', async (req, res) => {
    const community = req.body;
    community.comm_lower = community.comm_create.toLowerCase();

    try {
        const dupComm = await CommunityModel.findOne( {comm_lower: community.comm_lower });
        if (dupComm) {
            res.status(400).json({ error: "Community name in use" });
        }
        const newCommunity = new CommunityModel(community);
        await newCommunity.save();
        res.send(newCommunity);
    }
    catch (error) {
        res.status(400).json({ error });
    }
});

// R operations

// Returns the feed by getting the newests posts from all users
app.get('/getFeed', async (req, res) => {
    try {
        let limit = req.query.total;
        const posts = await PostModel.find().limit(limit).sort({ _id: -1 });
        res.send(posts);
    }
    catch (error) {
        res.status(400).json({ error });
    }
});

// Returns an individual post's data
app.get('/getPost/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await PostModel.findById(postId);
        res.send(post);
    }
    catch (error) {
        res.status(400).json({ error });
    }
});

// Returns the list of existing communities
app.get('/getCommunities', async (req, res) => {
    try {
        const communities = await CommunityModel.find();
        res.send(communities);
    }
    catch (error) {
        res.status(400).json({ error });
    }
})

// Returns a community
app.get('/getCommunity', async (req, res) => {
    try {
        const community = await CommunityModel.findOne( {comm_lower: req.body.comm_lower});
        res.send(community);
    }
    catch (error) {
        res.status(400).json({ error });
    }
})

// Returns user/s depending on input(letters)
app.get('/getUsers', async (req, res) => {
    searchparam = req.query.search;
    const test = await UserModel.find({username: {$regex: '^' + searchparam, $options: 'i'}});
    res.send(test);
})

app.get('/getUser', async (req, res) => {
    searchparam = req.query.username;
    const user = await UserModel.find({username:searchparam});
    res.send(user)
})

// U operations

// D operations

// Deletes a user's post
app.delete('/deletePost/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        let del = await PostModel.findById(postId);
        await PostModel.deleteOne( {_id: postId} );

        const community = await CommunityModel.findOne({ comm_lower: del.comm_name.toLowerCase() });
        if (community) {
            let obj = community.posts.find((o, i) => {
                if (o._id.toString() === del._id.toString()) {
                    community.posts.splice(i, 1);
                    return true; // stop searching
                }
            });
            await community.save();
        }

        const posts = await PostModel.find().sort({ _id: -1 });
        res.send(posts);
    }
    catch (error) {
        res.status(400).json({ error });
    }
})

// Logs the user in, checks for an existing username and checks for the accompanying password
app.post('/loginUser', async (req, res) => {
    try {
        const user = await UserModel.findOne({ username: req.body.username });
        if (user) {
            const result = req.body.password === user.password;
            if (result) {
                res.send(user);
            }
            else {
                res.status(400).json({ error: "Password doesn't match" });
            }
        }
        else {
            res.status(400).json({ error: "User doesn't exist" });
        }
    }
    catch (error) {
        res.status(400).json({ error });
    }
});

app.post('/addFriend', async (req, res) => {
    const friend = req.body;
})

app.listen(3001);