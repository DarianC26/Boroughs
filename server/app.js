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

app.get('/', (req, res) => {
    res.send('We are on home');
});

app.get('/sample/:id', (req, res) => {
    var id = req.params.id;
    res.send(id);
});

app.post('/loginUser', async (req, res) => {
    try {
        const user = await UserModel.findOne({ username: req.body.username });
        if (user) {
            const result = req.body.password === user.password;
            if (result) {
                res.send(user);
            }
            else {
                res.status(400).json({ error: "password doesn't match" });
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

app.post('/createUser', async (req, res) => {
    const user = req.body;

    try {
        const dupUser = await UserModel.findOne({ username: req.body.username });
        const dupEmail = await UserModel.findOne({ email: req.body.email });
        if ((dupUser != null) || (dupEmail != null)) {
            console.log("send a bad");
            res.status(400).send("This email or username is already in use");
        }
        else {
            console.log("send a good");
            const newUser = new UserModel(user);
            await newUser.save();
            res.send(newUser);
        }
    }
    catch (error) {
        res.status(400).json({ error });
    }

    console.log(user);
});

app.post('/createPost', async (req, res) => {
    let post = req.body;
    post.date = new Date();
    const newPost = new PostModel(post);
    await newPost.save();
  
    const community = await CommunityModel.findOne({ comm_create: req.body.comm_name });
    if (community) {
        console.log('hi');
        community.posts.unshift(newPost);
        await community.save();
    }

    res.json(newPost);
});

app.post('/createCommunity', async (req, res) => {
    const community = req.body;
    const newCommunity = new CommunityModel(community);
    await newCommunity.save();
    
    res.send(newCommunity);
});

app.get('/getFeed', async (req, res) => {
    try {
        const posts = await PostModel.find().sort({ _id: -1 });
        res.send(posts);
    }
    catch (error) {
        res.status(400).json({ error });
    }
});

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

app.get('/getCommunities', async (req, res) => {
    try {
        const communities = await CommunityModel.find();
        res.send(communities);
    }
    catch (error) {
        res.status(400).json({ error });
    }
})

app.post('/addFriend/:username', async (req, res) => {
    
})
app.listen(3001);