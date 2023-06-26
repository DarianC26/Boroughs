const express = require('express');
const app = express();
const mongoose = require('mongoose');
const UserModel = require("./models/user.js");
const CommunityModel = require("./models/communities.js");
const PostModel = require("./models/posts.js");
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
    const newUser = new UserModel(user);
    await newUser.save();
  
    res.json(user);
    console.log(user);
});

app.post('/createPost', async (req, res) => {
    const post = req.body;
    const newPost = new PostModel(post);
    await newPost.save();
  
    const community = await CommunityModel.findOne({ comm_name: req.body.comm_name });
    if (community) {
        community.posts.unshift(newPost);
        await community.save();
    }

    res.json(newPost);
    console.log(newPost);
});

app.post('/createCommunity', async (req, res) => {
    const community = req.body;
    const newCommunity = new CommunityModel(community);
    await newCommunity.save();
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

app.get('/getPost', async (req, res) => {
    try {
        const post = await PostModel.find(req._id);
        res.send(post);
    }
    catch (error) {
        res.status(400).json({ error });
    }
})
app.listen(3001);